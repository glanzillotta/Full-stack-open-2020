import React from 'react'
import PropTypes from 'prop-types'

const Notification = (props) => {
  const { message, setMessage } = props
  const style = {
    color:
      message[1] === 'success' ? 'green' : message[1] === 'fail' ? 'red' : '',
    background: 'lightGrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (message[0] === null || message[0] === undefined) return null

  setTimeout(() => setMessage([]), 5000)

  return <div style={style}>{message[0]}</div>
}

Notification.propTypes = {
  message: PropTypes.array.isRequired,
  setMessage: PropTypes.func.isRequired,
}

export default Notification
