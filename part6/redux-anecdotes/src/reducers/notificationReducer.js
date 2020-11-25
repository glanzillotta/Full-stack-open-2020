const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'SHOW':
            return action.data.message
        case 'CLEAR':
            return null

        default: return state
    }
}

export const setNotification = (message, time) => {
    return async dispatch => {
        const secondsNotification=time*1000
        await setTimeout(() => dispatch(clearNotification()),secondsNotification)
        dispatch({
            type: 'SHOW',
            data: { message }
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