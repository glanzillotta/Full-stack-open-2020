import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'GET_BLOGS':
    return action.data
  case 'CREATE_BLOG':
    return [...state, action.data]
  case 'LIKE': {
    const updatedBlog = action.data
    return state.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog)
  } case 'DELETE_BLOG':
    return state.filter(blog => blog.id !== action.data.id)
  case 'POST_COMMENT':
    return state.map(blog => {
      if (blog.id === action.data.blogId)
        blog.comments.concat(action.data.comment)
      return blog
    })
  default: return state
  }
}

export const getBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'GET_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'CREATE_BLOG',
      data: newBlog
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const liked = { ...blog, likes: ++blog.likes }
    const updatedBlog = await blogService.update(liked)
    dispatch({
      type: 'LIKE',
      data: updatedBlog
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: { id }
    })
  }
}

export const postComment = (blogId, comment) => {
  return async dispatch => {
    await blogService.addComment(blogId, comment)
    dispatch({
      type: 'POST_COMMENT',
      data: { blogId, comment }
    })
  }
}

export default blogReducer