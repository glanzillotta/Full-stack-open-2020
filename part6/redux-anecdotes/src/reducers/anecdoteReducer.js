import anecdoteServices from '../services/anecdoteServices.js'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteReducer = (state = [], action) => {

  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToVote = state.find(anecdote => anecdote.id === id)
      const anecdoteVoted = { ...anecdoteToVote, votes: anecdoteToVote.votes++ }
      return state.sort((a, b) => b.votes - a.votes).map(anecdote => anecdote - id === id ? anecdoteVoted : anecdote)
    case 'CREATE':
      const newAnecdote = asObject(action.data.content)
      return [...state, newAnecdote]
    case 'INIT':
      return action.data
    default: return state
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
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