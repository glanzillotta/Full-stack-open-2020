import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { loginUser } from '../reducers/userReducer'


const Login = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(loginUser({ username, password }))
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification('Wrong username or password', 'fail',5)
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username:{' '}
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password:{' '}
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div>
          <input type="submit" value="login" />
        </div>
      </form>
    </div>
  )
}

export default Login
