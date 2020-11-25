import anecdoteServices from '../services/anecdoteServices.js'

const anecdoteReducer = (state = [], action) => {

  switch (action.type) {
    case 'VOTE':
      const anecdoteVoted = action.data
      return state.sort((a, b) => b.votes - a.votes).map(anecdote => anecdote.id === anecdoteVoted.id ? anecdoteVoted : anecdote)
    case 'CREATE':
      return [...state, action.data]
    case 'INIT':
      return action.data
    default: return state
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const voted = { ...anecdote, votes: ++anecdote.votes }
    const updatedAnecdote = await anecdoteServices.update(voted)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteServices.create(content)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}

export const initAnecdote = () => {
  return async dispatch => {
    const anecdotes = await anecdoteServices.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

export default anecdoteReducer