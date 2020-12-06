import React, { useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { likeBlog, postComment } from '../reducers/blogReducer'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

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
  const handleSubmit = () => {
    dispatch(postComment(blog.id, comment))
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.url}</p>
      <p>{blog.likes}<Button onClick={handleLikes}>Like</Button></p>
      <p>Added by {blog.user ? blog.user.name || blog.user.username : 'Anonymous'}</p>
      <h4>Comments</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control placeholder="Comment" type="text" onChange={(e) => setComment(e.target.value)} />
          <Button type="submit">Add comment</Button>
        </Form.Group>
      </Form>
      {blog.comments ? <ul>
        {blog.comments.map((comment) => <li key={comment}>{comment}</li>)}
      </ul> : null}
    </div>
  )
}

export default BlogView