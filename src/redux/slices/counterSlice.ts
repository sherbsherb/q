import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type InitialState = {
  counter: number
}

type NumberObj = {
  num: number
}

type Action = {
  payload: number
}

const initialState: InitialState = {
  counter: 0
}

const counterSlice = createSlice({
  name: 'counterSlice',
  initialState,
  reducers: {
    increment: (state, action: Action) => {
      state.counter += action.payload
    },
    decrement: (state, action: PayloadAction<NumberObj>) => {
      state.counter -= action.payload.num
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
