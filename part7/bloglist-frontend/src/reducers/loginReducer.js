import loginService from '../services/login'
import blogService from '../services/blogs'

const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'LOGIN':
    return action.data.user
  case 'LOGOUT':
    window.localStorage.clear()
    return null
  case 'CHECK':
    return action.data.user
  default: return state
  }
}

export const loginUser = (credentials) => {
  return async dispatch => {
    const user = await loginService.login(credentials)
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch({
      type: 'LOGIN',
      data: { user }
    })
  }
}

export const logoutUser = () => {
  return {
    type: 'LOGOUT'
  }
}

export const loginCheck = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
  let user=null
  if (loggedUserJSON)
    user=JSON.parse(loggedUserJSON)
  blogService.setToken(user.token)
  return {
    type: 'CHECK',
    data: { user }
  }
}

export default userReducer