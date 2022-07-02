import { configureStore } from '@reduxjs/toolkit'
// import { createLogger } from 'redux-logger'
import counter from '@slices/counterSlice'
import login from '@slices/loginSlice'
import greetings from '@slices/greetingsSlice'
import users from '@slices/usersSlice'

// const logger = createLogger({}) // LOGGER MIDDLEWARE

export const store = configureStore({
  reducer: {
    counter,
    login,
    greetings,
    users
  },
  middleware: (defaultMiddleware) => defaultMiddleware(),
  // middleware: (defaultMiddleware) => defaultMiddleware().concat(logger),
  devTools: true
})
