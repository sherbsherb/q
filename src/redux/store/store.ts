import { configureStore } from '@reduxjs/toolkit'
// import { createLogger } from 'redux-logger'
import counter from '@slices/counterSlice'
import login from '@slices/loginSlice'
import greetings from '@slices/greetingsSlice'
import users from '@slices/usersSlice'
import nav from '@slices/navSlice'

// const logger = createLogger({}) // LOGGER MIDDLEWARE

export const store = configureStore({
  reducer: {
    counter,
    login,
    greetings,
    users,
    nav
  },
  middleware: (defaultMiddleware) => defaultMiddleware({
    serializableCheck: false
  }),
  // middleware: (defaultMiddleware) => defaultMiddleware().concat(logger),
  devTools: true
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
