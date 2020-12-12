import { ApolloServer, UserInputError, AuthenticationError, gql, PubSub } from 'apollo-server'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import Book from './models/book.js'
import Author from './models/author.js'
import User from './models/user.js'

dotenv.config()
const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET
const { connect } = mongoose
connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const pubsub = new PubSub()

const typeDefs = gql`
 type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
 }

type Book {
  title: String!
  published: Int!
  author: Author!
  genres: [String!]!
  id: ID!
}
type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}

type Token {
  value: String!
}

  type Query {
    bookCount:Int!
    authorCount:Int!
    allBooks(author:String, genre:String): [Book!]!
    allAuthors: [Author!]!
    allGenres: [String!]!
    me: User
  }

  type Mutation {
    addBook(
      title:String!,
      author:String!,
      published:Int
      genres: [String!]!
    ):Book
    editAuthor(
      name:String!
      setBornTo:Int!
      ):Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allGenres: async () => {
      const books = await Book.find({})
      let genres = []
      books.forEach((book) => {
        book.genres.forEach((genre) => {
          if (!genres.includes(genre)) {
            genres = genres.concat(genre)
          }
        })
      })
      return genres
    },
    allBooks: async (root, args) => {
      try {
        let query = {}
        if (args.genre && args.author) {
          const author = await Author.findOne({ name: args.author })
          query = { $and: [{ author: author }, { genres: { $in: args.genre } }] }
        } else if (args.author) {
          const author = await Author.findOne({ name: args.author })
          query = { author: author }
        } else if (args.genre)
          query = { genres: { $in: args.genre } }
        return await Book.find(query).populate('author')
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        })
      }

    },
    allAuthors: async () => await Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookCount: async (root) => {
      try {
        const author = await Author.find({ name: root.name })
        return await Book.find({ author: author }).countDocuments()
      } catch (err) {
        throw new UserInputError(err.message)
      }
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser)
        throw new AuthenticationError("not authenticated")

      const book = new Book({ ...args, author: author })
      try {
        let author = await Author.findOne({ name: args.author })
        if (!author) {
          author = new Author({ name: args.author })
          await author.save()
        }

        await book.save()
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        })
      }

      pubsub.publish('CREATE_BOOKS', { bookAdded: book })
      return book

    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser)
        throw new AuthenticationError("not authenticated")
      let author
      try {
        author = await Author.findOneAndUpdate({ name: args.name }, { name: args.name, born: args.setBornTo }, { new: true })
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        })
      }
      pubsub.publish('UPDATE_AUTHOR', { updatedAuthor: author })
      return author
    },
    createUser: async (root, args) => {
      const user = new User({ ...args })
      try {
        return await user.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secred') {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  },
  Subscription: {
    createBook: {
      subscribe: () => pubsub.asyncIterator([CREATE_BOOKS])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
