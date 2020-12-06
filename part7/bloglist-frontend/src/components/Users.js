import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const selector = (state) => state.users
  const users = useSelector(selector)
  if (!users) return null

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <thead>
          {users.map(user => (
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name || user.username}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </thead>
      </table>
    </div>
  )
}

export default Users