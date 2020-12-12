import React, { useState, useEffect } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { ALL_BOOKS_FILTERED, USER_GENRE, ALL_GENRES } from './queries'

const Books = ({ show }) => {
  const genre = useQuery(USER_GENRE)
  const [getFavorites, favorites] = useLazyQuery(ALL_BOOKS_FILTERED)
  const genres = useQuery(ALL_GENRES)
  const [filter, setFilter] = useState('')
  const [books, setBooks] = useState([])

  useEffect(() => {
    if (genre.data) getFavorites({ variables: { genre: genre.data.me.favoriteGenre } })
    if(filter) getFavorites({ variables: { genre: filter } })
    if (favorites.data) setBooks(favorites.data.allBooks)
  }, [genre.data, favorites.data, filter]) //eslint-disable-line

  if (!show) return null
  if (genre.loading || books.loading) return <div>loading...</div>

  return (
    <div>
      <h2>books</h2>
      {genre.data ? (
        <p>
          in genre <strong>{genre.data.me.favoriteGenre}</strong>
        </p>
      ) : null}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(book =>
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genres.data.allGenres.map((gen) => (<button key={gen} onClick={() =>setFilter(gen)}>{gen}</button>))}
      <button key='all' onClick={() => setFilter(null)}>all genres</button>
    </div>
  )
}

export default Books