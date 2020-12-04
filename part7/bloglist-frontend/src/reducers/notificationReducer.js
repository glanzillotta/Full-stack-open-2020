const notificationReducer =(state=null, action) => {
  switch (action.type) {
  case 'SHOW':
    return action.data
  case 'CLEAR':
    return null
  default: return state
  }
}

let timeout
export const setNotification = (message, fail, time) => {
  return async dispatch => {
    const secondsNotification= time*1000
    clearTimeout(timeout)
    timeout = setTimeout(() => dispatch(clearNotification()), secondsNotification)
    dispatch({
      type: 'SHOW',
      data: { message, fail }
    })
  }
}

export const clearNotification = () => {
  return async dispatch => {
    dispatch({
      type: 'CLEAR'
    })
  }
}

export default notificationReducer