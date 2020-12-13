
import React, { useState, useEffect } from 'react'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from './components/queries'


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const authors = useQuery(ALL_AUTHORS)
  useQuery(ALL_BOOKS)
  const client = useApolloClient()

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    console.log('dataInStore: ', dataInStore);
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }   
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      updateCacheWith(addedBook)
      window.alert(`${addedBook.title} added!`)
    }
  })

  useEffect(() => {
    setToken(localStorage.getItem('library-token'))
  }, [])

  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (authors.loading) {
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
        />

        <NewBook
          show={page === 'add'}
          updateCacheWith={updateCacheWith}
        />

      </div>
    )
  }
}

export default App