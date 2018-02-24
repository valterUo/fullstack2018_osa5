import React from 'react'

class App extends React.Component {

  getId = () => (100000*Math.random()).toFixed(0)

  vote = (id) => () => {
    this.props.store.dispatch({
      type: 'VOTE',
      data: { id }
    })

  }

  addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    this.props.store.dispatch({
      type: 'NEW_ANECDOTE',
      data: {
        content: content,
        id: this.getId,
        votes: 0
      }
    })

    event.target.anecdote.value = ''
  }



  render() {
    const anecdotes = this.props.store.getState()
    anecdotes.sort(function(a, b) {
      return b.votes - a.votes;
      })
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button key={anecdote.id} onClick={this.vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>Create new</h2>
        <form onSubmit={this.addAnecdote}>
          <div><input name="anecdote" /></div>
          <button type="submit">create</button> 
        </form>
      </div>
    )
  }
}

export default App