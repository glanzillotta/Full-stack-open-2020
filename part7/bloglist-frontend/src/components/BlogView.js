import React, { useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { likeBlog, postComment } from '../reducers/blogReducer'

const BlogView = () => {
  const match = useRouteMatch('/blogs/:id')
  const selectorBlog = (state) => state.blogs.filter(blog => blog.id === String(match.params.id))
  const blogs = useSelector(selectorBlog)
  const blog = blogs[0]
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  if (!blog) return null

  const handleLikes = async () => {
    try {
      dispatch(likeBlog(blog))
    } catch (exception) {
      dispatch(setNotification(exception.message, true, 5))
    }
  }

  /*const handleRemove = async () => {
      try {
        if (window.confirm(`Are you sure you want to remove ${blog.title} by ${blog.author}`)) {
          dispatch(setNotification(`The blog ${blog.title} has been removed`, false, 5))
          dispatch(deleteBlog(blog.id))
        }
      } catch (exception) {
        dispatch(setNotification(exception.message, true, 5))
      }
    }*/

  const handleSubmit = () => {
    dispatch(postComment(blog.id, comment))
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <div>{blog.url}</div>
      <div>{blog.likes}<button onClick={handleLikes}>like</button></div>
      <div>Added by {blog.user ? blog.user.name || blog.user.username : 'Anonymous'}</div>
      <h3>Comments</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setComment(e.target.value)} />
        <input type="submit" value="add comment" />
      </form>
      {blog.comments?<ul>
        {blog.comments.map((comment) => <li key={comment}>{comment}</li>)}
      </ul>:null}
    </div>
  )
}

export default BlogView