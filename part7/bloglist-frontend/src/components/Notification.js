import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const selector = (state) => state.notification
  const notification=useSelector(selector)
  if(!notification) return null

  const style = {
    color:
      notification.fail ? 'red' : 'green',
    background: 'lightGrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }


  return <div style={style} name="message">{notification.message}</div>
}

export default Notification
