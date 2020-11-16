import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import FormBlog from './components/FormBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState([])
  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [blogs.length])

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} setMessage={setMessage} />
        <Login setUser={setUser} setMessage={setMessage} />
      </div>
    )
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={message} setMessage={setMessage} />
        <Togglable buttonLabel={'new note'} ref={blogFormRef}>
          <FormBlog setMessage={setMessage} blogFormRef={blogFormRef} />
        </Togglable>
        <p>
          {user.name} logged in{' '}
          <input
            type="button"
            value="log out"
            onClick={() => {
              window.localStorage.clear()
              window.location.reload()
            }}
          />
        </p>
        <h2>create new</h2>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog key={blog.id} blog={blog} setMessage={setMessage} />
          ))}
      </div>
    )
  }
}

export default App
