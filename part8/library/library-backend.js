import { ApolloServer, UserInputError, gql } from 'apollo-server'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Book from './models/book.js'
import Author from './models/author.js'

dotenv.config()
const MONGODB_URI = process.env.MONGODB_URI
const { connect } = mongoose
connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

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

  type Query {
    bookCount:Int!
    authorCount:Int!
    allBooks(author:String, genre:String): [Book!]!
    allAuthors: [Author!]!
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
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
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
      }catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        })
      }

    },
    allAuthors: async () => await Author.find({})
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
    addBook: async (root, args) => {
      try {
        let author = await Author.findOne({ name: args.author })
        if (!author) {
          author = new Author({ name: args.author })
          await author.save()
        }

        const book = new Book({ ...args, author: author })
        return book.save()
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        })
      }
    },
    editAuthor: async (root, args) => {
      try {
        return await Author.findOneAndUpdate({ name: args.name }, { name: args.name, born: args.setBornTo }, { new: true })
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        })
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
