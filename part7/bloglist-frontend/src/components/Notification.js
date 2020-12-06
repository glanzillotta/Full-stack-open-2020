import React from 'react'
import { useSelector } from 'react-redux'
import Alert from 'react-bootstrap/Alert'

const Notification = () => {
  const selector = (state) => state.notification
  const notification = useSelector(selector)
  if (!notification) return null

  return (
    <div className="container">
      <Alert variant={notification.fail ? 'danger' : 'success'} name="message">{notification.message}</Alert>
    </div>
  )
}

export default Notification
