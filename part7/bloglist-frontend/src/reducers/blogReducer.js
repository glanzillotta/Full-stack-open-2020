import blogService from '../services/blogs'

const blogReducer = (state=[], action) => {
  switch (action.type) {
  case 'GET':
    return action.data
  case 'CREATE':
    return [...state, action.data]
  case 'LIKE':{
    const updatedBlog=action.data
    return state.map(blog => blog.id === updatedBlog.id?updatedBlog:blog)
  } case 'DELETE':
    return state.filter(blog => blog.id !==action.data.id)
  default: return state
  }
}

export const getBlogs=() => {
  return async dispatch => {
    const blogs=await blogService.getAll()
    dispatch({
      type:'GET',
      data:blogs
    })
  }
}

export const createBlog=(blog) => {
  return async dispatch => {
    const newBlog=await blogService.create(blog)
    dispatch({
      type:'CREATE',
      data:newBlog
    })
  }
}

export const likeBlog=(blog) => {
  return async dispatch => {
    const liked={ ...blog,likes:++blog.likes }
    const updatedBlog=await blogService.update(liked)
    dispatch({
      type:'LIKE',
      data:updatedBlog
    })
  }
}

export const deleteBlog =(id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type:'DELETE',
      data: { id }
    })
  }
}

export default blogReducer