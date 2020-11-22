const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'SHOW':
            return action.data.message
        default: return state
    }
}

export const notificationAnecdoteVoted = (message) => {
    return {
        type: 'SHOW',
        data: { message }
    }
}

export default notificationReducer