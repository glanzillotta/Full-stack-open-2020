import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notificationAnecdoteVoted } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        if (state.filter === 'ALL')
            return state.anecdotes
        else return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter) ? anecdote : null)
    })
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(voteAnecdote(anecdote))
        dispatch(notificationAnecdoteVoted(`you voted '${anecdote.content}'`))
        setTimeout(() => dispatch(notificationAnecdoteVoted('')), 5000)
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList