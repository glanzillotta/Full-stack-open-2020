import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
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
      dispatch(setNotification(`a new blog ${title} by ${author} has been added`,false, 5))
      setTitle('')
      setAuthor('')
      setUrl('')
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      dispatch(setNotification(exception.message, true, 5))
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          title:{' '}
          <input
            name="title"
            type="text"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:{' '}
          <input
            name="author"
            type="text"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:{' '}
          <input name="url" type="text" onChange={({ target }) => setUrl(target.value)} />
        </div>
        <div>
          <input type="submit" value="create" name="create" />
        </div>
      </form>
    </div>
  )
}

FormBlog.propTypes = {
  blogFormRef: PropTypes.object.isRequired,
}

export default FormBlog
