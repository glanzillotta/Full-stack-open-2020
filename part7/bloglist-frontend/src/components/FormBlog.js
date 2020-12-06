import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { createBlog } from '../reducers/blogReducer'
import PropTypes from 'prop-types'
import { setNotification } from '../reducers/notificationReducer'

const FormBlog = (props) => {
  const { blogFormRef } = props
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = async (event) => {
    try {
      event.preventDefault()
      const newBlog = { title: title, author: author, url: url }
      dispatch(createBlog(newBlog))
      dispatch(setNotification(`a new blog ${title} by ${author} has been added`, false, 5))
      setTitle('')
      setAuthor('')
      setUrl('')
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      dispatch(setNotification(exception.message, true, 5))
    }
  }

  return (
    <Form>
      <Form.Group>
        <Form.Label>title:</Form.Label>
        <Form.Control
          placeholder="Title"
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>author:</Form.Label>
        <Form.Control
          placeholder="Author"
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>url:</Form.Label>
        <Form.Control placeholder="URL" name="url" onChange={({ target }) => setUrl(target.value)} />
      </Form.Group>
      <Button type="submit" name="create" onClick={handleNewBlog}>Create</Button>
    </Form>
  )
}

FormBlog.propTypes = {
  blogFormRef: PropTypes.object.isRequired,
}

export default FormBlog
