import { createSlice } from '@reduxjs/toolkit'
import { navStructure } from '@components/Nav/navStructure'

const initialState = {
  navStructure
}

const navSlice = createSlice({
  name: 'navSlice',
  initialState,
  reducers: {
    toggleLastNavItem: (state) => {
      if (state.navStructure.length < 1) return
      state.navStructure.at(-1)!.hidden = !state.navStructure.at(-1)!.hidden
    }
  }
})

export default navSlice.reducer
export const { toggleLastNavItem } = navSlice.actions
