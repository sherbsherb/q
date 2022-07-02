import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type InitialState = {
  counter: number
}

type NumberObj = {
  num: number
}

const initialState: InitialState = {
  counter: 0
}

const counterSlice = createSlice({
  name: 'counterSlice',
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      state.counter += (action.payload || 1)
    },
    decrement: (state, action: PayloadAction<NumberObj>) => {
      state.counter -= (action.payload.num || 1)
    }
  },
  // not preferable way of extraReducers syntax
  extraReducers: {
    'greetingsSlice/changeGreeting': (state, action) => {
      console.log('I can respond to changeGreeting() action of greetingsSlice from counterSlice')
    }
  }
})

export default counterSlice.reducer
export const { increment, decrement } = counterSlice.actions
