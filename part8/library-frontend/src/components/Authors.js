import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_AUTHOR } from './queries'

const Authors = (props) => {
  const [authors, setAuthors] = useState([])
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const { data } = useQuery(ALL_AUTHORS)
  const [createBook] = useMutation(UPDATE_AUTHOR, { refetchQueries: [{ query: ALL_AUTHORS }] })

  useEffect(() => {
    if (data)
      setAuthors(data.allAuthors)
  }, [data])

  if (!props.show) return null

  const handleSubmit = (event) => {
    event.preventDefault()
    createBook({ variables: { name, setBornTo: +born } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>Set birthyear</h3>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input type="text" onChange={({ target }) => setName(target.value)} />
        </div>
        <div>
          born: <input type="text" onChange={({ target }) => setBorn(target.value)} />
        </div>
        <button type="submit">update author</button>
      </form>

    </div>
  )
}

export default Authors
