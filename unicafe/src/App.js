import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import counterReducer from './reducer'
const store = createStore(counterReducer)


const Statistiikka = () => {
  const palautteita = store.getState().good + store.getState().ok + store.getState().bad
  console.log(store.getState())
  if (palautteita === 0) {
    return (
      <div>
        <h2>Statistiikka</h2>
        <div>Ei yhtään palautetta annettu.</div>
      </div>
    )
  }

  return (
    <div>
      <h2>Statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{store.getState().good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{store.getState().ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{store.getState().bad}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{(((store.getState().good + store.getState().ok)/palautteita)*100).toFixed(2) + '%'}</td>
          </tr>
        </tbody>
      </table>

      <button onClick={e => store.dispatch({ type: 'ZERO' })}>nollaa tilasto</button>
    </div >
  )
}

class App extends React.Component {
  klik = (event) => () => {
    if(event === 'GOOD') {
      store.dispatch({ type: 'GOOD'})
    }
    if(event === 'OK') {
      store.dispatch({ type: 'OK'})
    }
    if(event === 'BAD') {
      store.dispatch({ type: 'BAD'})
    }
  }

  render() {
    return (
      <div>
        <h2>Anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka />
      </div>
    )
  }
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)

export default App
