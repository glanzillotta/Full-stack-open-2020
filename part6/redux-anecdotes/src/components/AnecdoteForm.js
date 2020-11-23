import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import {notificationAnecdoteVoted} from '../reducers/notificationReducer'
import anecdoteServices from '../services/anecdoteServices'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const newAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(addAnecdote(content))
    await anecdoteServices.create(content)
    dispatch(notificationAnecdoteVoted(`you created '${content}'`))
    setTimeout(()=>dispatch(notificationAnecdoteVoted('')),5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={newAnecdote}>
        <div><input type="text" name="anecdote" /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm