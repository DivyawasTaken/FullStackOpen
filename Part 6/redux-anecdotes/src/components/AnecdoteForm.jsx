import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
//import { createNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dis = useDispatch()
  
  const addAnecdote = async (event) => { 
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    dis(createAnecdote(anecdote))
    //dis(createNotification(`You have created '${anecdote}'`, 5))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="Anecdote" /></div>
        <button type='Submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm