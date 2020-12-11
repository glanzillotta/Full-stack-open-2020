import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import Select from 'react-select';
import { ALL_AUTHORS, UPDATE_AUTHOR } from './queries'

const Authors = ({ show, token, authors }) => {
  const [name, setName] = useState(null)
  const [born, setBorn] = useState('')
  const [updateAuthor] = useMutation(UPDATE_AUTHOR, { refetchQueries: [{ query: ALL_AUTHORS }] })

  if (!show) return null

  const options = authors.map(author => {
    return {
      value: author.id,
      label: author.name
    }
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    updateAuthor({ variables: { name: name.label, setBornTo: +born } })

    setName('')
    setBorn('')
  }

  if (token)
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
          <label>
            Name:
          <Select
              placeholder='Name'
              onChange={setName}
              options={options}
            />
          </label>
          <div>
            Born: <input type="text" onChange={({ target }) => setBorn(target.value)} />
          </div>
          <button type="submit">update author</button>
        </form>

      </div>
    )
  else return (
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
    </div>
  )
}

export default Authors
