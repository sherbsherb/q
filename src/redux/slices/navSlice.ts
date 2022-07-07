import { createSlice } from '@reduxjs/toolkit'
import { navStructure } from '@src/components/Nav/navStructure'

const initialState = navStructure

const navSlice = createSlice({
  name: 'navSlice',
  initialState,
  reducers: {
    toggleLastNavItem: (state, action) => {
      if (state.length < 1) return
      state.at(-1)!.visible = !state.at(-1)!.visible
    }
  }
})

export default navSlice.reducer
export const { toggleLastNavItem } = navSlice.actions
