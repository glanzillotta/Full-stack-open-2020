import React, { useState, useEffect } from 'react'

const Books = ({show,books,genres}) => {
  const [booksToShow, setBooksToShow] = useState([])
  console.log(books);
  const [filter, setFilter] = useState('')

  useEffect(() => {
    if (filter) {
      setBooksToShow(books.filter((book) => book.genres.includes(filter)))
    } else {
      setBooksToShow(books)
    }
  }, [filter]) //eslint-disable-line


  if (!show) return null

  return (
    <div>
      <h2>books</h2>
      {filter ? (
        <p>
          in genre <b>{filter}</b>
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
      {genres.map((gen) => (<button key={gen} onClick={() =>setFilter(gen)}>{gen}</button>))}
      <button key='all' onClick={() => setFilter(null)}>all genres</button>
    </div>
  )
}

export default Books