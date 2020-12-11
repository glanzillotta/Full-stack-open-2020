import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
    query{
        allAuthors{
            name
            born
        }
    }
`

export const ALL_GENRES = gql`
    query{
        allGenres
    }
`

export const USER_GENRE = gql`
    query{
        me{
            favoriteGenre
        }
    }
`

export const ALL_BOOKS = gql`
    query{
        allBooks{
            title
            author {name}
            published
            genres
        }
    }
`
export const ALL_BOOKS_FILTERED = gql`
    query allBooks($genre:String!){
        allBooks(
            genre: $genre
        ){
            title
            author {name}
            published
            genres
        }
    }
`

export const CREATE_BOOKS = gql` 
    mutation createBook($title:String!, $author:String!, $published:Int, $genres:[String!]!) {
  addBook(
    title: $title
    author: $author
    published: $published
    genres: $genres
  ) {
    title,
    author {name}
  }
}
`
export const UPDATE_AUTHOR = gql`
    mutation updateAuthor($name:String!, $setBornTo:Int!){
        editAuthor(
            name: $name
            setBornTo: $setBornTo
        ){
            name
            born
        }
    }
`
export const LOGIN = gql`
    mutation login($username:String!, $password:String!){
        login(
            username: $username,
            password: $password
        ){
            value
        }
    }
`