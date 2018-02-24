import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  it('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  it('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  it('reducer is immutable function', () => {
      const action = {
          type: 'OK'
      }
      const state = {
          good: 1,
          ok: 2,
          bad: 3
      }
      deepFreeze(state)
      const newState = counterReducer(state, action)
      expect(newState).toEqual({
          good: 1,
          ok: 3,
          bad: 3
      })
  })

  it('ZERO returns reducer to initial state', () => {
    const action = {
        type: 'ZERO'
    }
    const state = {
        good: 1,
        ok: 2,
        bad: 3
    }
    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual(initialState)
  })
})