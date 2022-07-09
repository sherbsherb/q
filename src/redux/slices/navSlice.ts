import { createSlice } from '@reduxjs/toolkit'
import { navStructure } from '@components/Nav/navStructure'

const initialState = {
  navStructure,
  burger: { isOpen: false }
}

const navSlice = createSlice({
  name: 'navSlice',
  initialState,
  reducers: {
    toggleLastNavItem: (state) => {
      if (state.navStructure.length < 1) return
      state.navStructure.at(-1)!.hidden = !state.navStructure.at(-1)!.hidden
    },
    closeBurger: (state) => {
      state.burger.isOpen = false
    },
    toggleBurger: (state) => {
      state.burger.isOpen = !state.burger.isOpen
    }
  }
})

export default navSlice.reducer
export const { toggleLastNavItem, closeBurger, toggleBurger } = navSlice.actions
