import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'

const Blogs =() => {
  const selector= (state) => state.blogs
  const blogs=useSelector(selector)
  return (
    <div>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog}/>
        ))}
    </div>
  )
}

export default Blogs