import React from 'react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'

const User = props => {
  const dispatch= useDispatch()
  const handleLogout =() => dispatch(logoutUser())

  return (
    <div>
      {props.user.name || props.user.username} logged in{' '}
      <input
        type="button"
        value="log out"
        onClick={handleLogout} />
    </div>
  )
}

export default User