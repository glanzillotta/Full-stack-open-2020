import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { setNotification } from '../reducers/notificationReducer'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'

const Blog = (props) => {
  const { blog } = props
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const hide = { display: visible ? '' : 'none' }
  const border = { border: '1px solid', margin: '2px' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLikes = async () => {
    try {
      dispatch(likeBlog(blog))
    } catch (exception) {
      dispatch(setNotification(exception.message, true, 5))
    }
  }

  const handleRemove = async () => {
    try {
      if (window.confirm(`Are you sure you want to remove ${blog.title} by ${blog.author}`)) {
        dispatch(setNotification(`The blog ${blog.title} has been removed`, false, 5))
        dispatch(deleteBlog(blog.id))
      }
    } catch (exception) {
      dispatch(setNotification(exception.message, true, 5))
    }
  }

  return (
    <div style={border} id="blog">
      {blog.title} {blog.author}{' '}
      <input type="button" id="view" value="view" onClick={toggleVisibility} />
      <div style={hide} className="detail">
        {blog.url}
        <div className="likes">
          {blog.likes}{' '}
          <input type="button" id="like" value="like" onClick={handleLikes} />
        </div>
        {blog.user !== undefined && blog.user.username}
        <div>
          <input type="button" id="remove" value="remove" onClick={handleRemove} />
        </div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
