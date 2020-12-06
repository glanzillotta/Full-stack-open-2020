import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UsersView = () => {
  const match = useRouteMatch('/users/:id')
  const selector= (state) => state.blogs.filter(blog => {
    if(!blog.user)
      return null
    return blog.user.id===String(match.params.id)
  })
  const blogs = useSelector(selector)
  return (
    <div>
      <ul>
        {blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>
  )
}

export default UsersView