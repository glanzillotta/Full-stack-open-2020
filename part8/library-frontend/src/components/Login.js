import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from './queries'

const Books = ({setToken, show, setPage}) => {
  const [username,setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login,result] = useMutation(LOGIN)
  
  useEffect(() => {
      if(result.data){
          const token = result.data.login.value
          setToken(token)
          localStorage.setItem('library-token', token)
      }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data])

  if (!show) return null

  const handleSubmit = (e)=> {
    e.preventDefault()
    login({variables:{username,password}})
    setPage('authors')
  }

  return (
    <div>
    <form onSubmit={handleSubmit}>
        <div>username: <input type="text" onChange={({ target }) => {setUsername(target.value)}} /></div>
        <div>password: <input type="password" onChange={({ target }) => {setPassword(target.value)}} /></div>
        <input type="submit" value="login" /> 
    </form>
    </div>
  )
}

export default Books