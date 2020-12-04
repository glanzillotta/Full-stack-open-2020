import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Login from './components/Login'
import FormBlog from './components/FormBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Blogs from './components/Blogs'
import User from './components/User'
import { getBlogs } from './reducers/blogReducer'
import { loginCheck } from './reducers/userReducer'

const App = () => {
  const selector = (state) => state.user
  const user=useSelector(selector)
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loginCheck())
  }, [])

  useEffect(() => {
    dispatch(getBlogs())
  }, [dispatch])

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <Login />
      </div>
    )
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        <User user={user} />
        <Togglable buttonLabel={'new blog'} ref={blogFormRef}>
          <FormBlog blogFormRef={blogFormRef} />
        </Togglable>
        <h2>create new</h2>
        <Blogs/>
      </div>
    )
  }
}

export default App
