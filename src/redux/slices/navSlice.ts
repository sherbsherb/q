import { createSlice } from '@reduxjs/toolkit'
import { navStructure } from '@components/Nav/navStructure'

const initialState = {
  navStructure,
  burger: { isOpen: false },
  mediaQueryWidth: { logoExtension: 0, logoPart: 0, icon: 0, text: 0, burger: 0 }
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
    },
    setScreenWidthWhenHideLogoExtension: (state, action) => {
      state.mediaQueryWidth.logoExtension = action.payload
    },
    setScreenWidthWhenHideLogoPart: (state, action) => {
      state.mediaQueryWidth.logoPart = action.payload
    },
    setScreenWidthWhenHideIcon: (state, action) => {
      state.mediaQueryWidth.icon = action.payload
    },
    setScreenWidthWhenHideText: (state, action) => {
      state.mediaQueryWidth.text = action.payload
    },
    setScreenWidthWhenDisplayBurger: (state, action) => {
      state.mediaQueryWidth.burger = action.payload
    }
  }
})

export default navSlice.reducer
export const {
  toggleLastNavItem, closeBurger,
  toggleBurger,
  setScreenWidthWhenHideLogoExtension,
  setScreenWidthWhenHideLogoPart,
  setScreenWidthWhenHideIcon,
  setScreenWidthWhenHideText,
  setScreenWidthWhenDisplayBurger
} = navSlice.actions
