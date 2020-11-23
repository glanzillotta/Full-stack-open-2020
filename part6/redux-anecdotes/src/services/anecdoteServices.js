import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getId = () => (100000 * Math.random()).toFixed(0)

const create = async (anecdote) => {
  const obj = { anecdote, vote: 0, id: getId() }
  const response = await axios.post(baseUrl, obj)
  return response.data
}

export default { getAll, create }