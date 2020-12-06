import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

let token = null
const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const create = async (newBlog) => {
  const config = { headers: { Authorization: token }, }
  const res = await axios.post(baseUrl, newBlog, config)
  return res.data
}

const update = async (updatedBlog) => {
  const res = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog)
  return res.data
}

const remove = async (id) => {
  const config = { headers: { Authorization: token } }
  const res = await axios.delete(`${baseUrl}/${id}`, config)
  return res.data
}

const addComment = async (blogId, comment) => {
  const res = await axios.post(`${baseUrl}/${blogId}/comments`, { newComment: comment })
  return res.data
}

export default { getAll, setToken, create, update, remove, addComment }
