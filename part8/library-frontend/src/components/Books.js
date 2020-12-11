import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { USER_GENRE } from './queries'

const Books = ({show,books}) => {
  const [booksToShow, setBooksToShow] = useState([])
  const genre = useQuery(USER_GENRE)

  useEffect(() => {
    if (genre.data) {
      setBooksToShow(books.filter((book) => book.genres.includes(genre.data.me.favoriteGenre)))
    } else {
      setBooksToShow(books)
    }
  }, [genre.data]) //eslint-disable-line


  if (!show) return null

  return (
    <div>
      <h2>books</h2>
      {genre ? (
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
          {booksToShow.map(book =>
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books