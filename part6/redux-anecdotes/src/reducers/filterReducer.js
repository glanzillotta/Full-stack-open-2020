const filterReducer = (state = 'ALL', action) => {
    switch (action.type) {
        case 'FILTER':
            return action.data.filter;
        default: return state
    }
}

export const filterAnecdote = (filter) => {
    return {
        type: 'FILTER',
        data: { filter }
    }
}

export default filterReducer