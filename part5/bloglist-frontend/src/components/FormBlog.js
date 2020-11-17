import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const FormBlog = (props) => {
  const { setMessage, blogFormRef, setBlogs, blogs } = props
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = async (event) => {
    setMessage()
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
      setBlogs([...blogs, newBlog])
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
          <input type="submit" value="create" />
        </div>
      </form>
    </div>
  )
}

FormBlog.propTypes = {
  blogFormRef: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  setBlogs: PropTypes.func.isRequired,
  blogs: PropTypes.object.isRequired,
}

export default FormBlog
