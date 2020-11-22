const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'CREATE':
            return state
        case 'VOTED':
            return state = action.data.message
            
        default: return state
    }
}

export const notificationAnecdoteVoted = (message) => {
    return {
        type: 'VOTED',
        data: { message }
    }
}

export default notificationReducer