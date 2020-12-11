
import React, { useState } from 'react'
import { useApolloClient, useQuery } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { ALL_AUTHORS, ALL_BOOKS, ALL_GENRES } from './components/queries'


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const authors = useQuery(ALL_AUTHORS)
  const genres = useQuery(ALL_GENRES)
  const books = useQuery(ALL_BOOKS)
  const client = useApolloClient()

  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (authors.loading || books.loading ) {
    return <div>loading...</div>
  }

  if (!token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>

        <Authors
          show={page === 'authors'}
          token={token}
          authors={authors.data.allAuthors}
        />

        <Books
          show={page === 'books'}
          books={books.data.allBooks}
          genres={genres.data.allGenres}
        />
        <Login show={page === 'login'} setToken={setToken} setPage={setPage}/>

      </div>
    )

  } else {


    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => handleLogout} >logout</button>
        </div>

        <Authors
          show={page === 'authors'}
          token={token}
          authors={authors.data.allAuthors}
        />

        <Books
          show={page === 'books'}
          books={books.data.allBooks}
          genres={genres.data.allGenres}
        />

        <NewBook
          show={page === 'add'}
        />

      </div>
    )
  }
}

export default App