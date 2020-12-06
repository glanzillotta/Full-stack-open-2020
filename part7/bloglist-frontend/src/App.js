import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Login from './components/Login'
import FormBlog from './components/FormBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Blogs from './components/Blogs'
import Users from './components/Users'
import UserView from './components/UserView'
import BlogView from './components/BlogView'
import { getUsers } from './reducers/userReducer'
import { loginCheck, logoutUser } from './reducers/loginReducer'
import { getBlogs } from './reducers/blogReducer'

const App = () => {
  const selector = (state) => state.user
  const user = useSelector(selector)
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const padding= { padding: '5px' }
  const handleLogout =() => dispatch(logoutUser())

  useEffect(() => {
    dispatch(loginCheck())
    dispatch(getBlogs())
    dispatch(getUsers())
  }, [dispatch])

  if (user === null) {
    return (
      <div className="container">
        <h2>Log in to application</h2>
        <Notification />
        <Login />
      </div>
    )
  } else {
    return (
      <div className="container">
        <h2>blogs</h2>
        <Notification />
        <Router>
          <div>
            <Link to={'/'} style={padding}>blogs</Link>
            <Link to={'/users'} style={padding}>users</Link>
            {user.name || user.username} logged in <Button onClick={handleLogout}>Log out</Button>
          </div>
          <Switch>
            <Route path="/users/:id">
              <UserView />
            </Route>
            <Route path="/users" >
              <Users />
            </Route>
            <Route path="/blogs/:id">
              <BlogView />
            </Route>
            <Route path="/blogs">
              <Blogs />
            </Route>
            <Route path="/">
              <h2>create new</h2>
              <Togglable buttonLabel={'new blog'} ref={blogFormRef}>
                <FormBlog blogFormRef={blogFormRef} />
              </Togglable>
              <Blogs />
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
