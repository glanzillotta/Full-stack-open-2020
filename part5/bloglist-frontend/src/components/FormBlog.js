import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const FormBlog = (props) => {
  const { setMessage, blogFormRef, setBlogs } = props
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = async (event) => {
    try {
      event.preventDefault()
      const newBlog = { title: title, author: author, url: url }
      await blogService.create(newBlog)
      blogFormRef.current.toggleVisibility()
      setMessage([
        `a new blog ${title} by ${author} has been added`,
        'success'
      ])
      setTitle('')
      setAuthor('')
      setUrl('')
      blogService.getAll().then((blogs) => setBlogs(blogs))
    } catch (exception) {
      setMessage([exception.message, 'fail'])
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
  setMessage: PropTypes.func.isRequired,
  setBlogs: PropTypes.func.isRequired,
}

export default FormBlog
