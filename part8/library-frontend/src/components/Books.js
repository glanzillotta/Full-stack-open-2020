import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from './queries'

const Books = (props) => {
  const [books,setBooks] = useState([])
  const {data} = useQuery(ALL_BOOKS)
  
  useEffect(() => {
    if(data)
      setBooks(data.allBooks)
  }, [data])

  if (!props.show) return null

  return (
    <div>
      <h2>books</h2>

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
    </div>
  )
}

export default Books