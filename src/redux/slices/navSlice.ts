import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  burger: { isOpen: false },
  mediaQueryWidth: { logoExtension: 0, logoPart: 0, icon: 0, name: 0, burger: 0 },
  activeMenuIdsChain: ['top'],
  nextMenuId: '',
  hiddenItemNames: ['Link B'],
  menuDefaultRightPosition: 0
}

const navSlice = createSlice({
  name: 'navSlice',
  initialState,
  reducers: {
    closeBurger: (state) => { state.burger.isOpen = false },
    toggleBurger: (state) => { state.burger.isOpen = !state.burger.isOpen },
    setScreenWidthWhenHideLogoExtension: (state, action) => { state.mediaQueryWidth.logoExtension = action.payload },
    setScreenWidthWhenHideLogoPart: (state, action) => { state.mediaQueryWidth.logoPart = action.payload },
    setScreenWidthWhenHideIcon: (state, action) => { state.mediaQueryWidth.icon = action.payload },
    setScreenWidthWhenHideText: (state, action) => { state.mediaQueryWidth.name = action.payload },
    setScreenWidthWhenDisplayBurger: (state, action) => { state.mediaQueryWidth.burger = action.payload },
    setMenuDefaultRightPosition: (state, action) => { state.menuDefaultRightPosition = action.payload },
    openMenuXXX: (state, action) => { state.activeMenuIdsChain = ['top', action.payload] },
    goDownInMenuXXX: (state, action) => { state.activeMenuIdsChain = [...state.activeMenuIdsChain, action.payload] },
    goUpInMenuXXX: (state) => { state.activeMenuIdsChain = state.activeMenuIdsChain.slice(0, -1) },
    closeMenuXXX: (state) => { state.activeMenuIdsChain = ['top'] }
  }
})

export default navSlice.reducer
export const {
  closeBurger,
  toggleBurger,
  setScreenWidthWhenHideLogoExtension,
  setScreenWidthWhenHideLogoPart,
  setScreenWidthWhenHideIcon,
  setScreenWidthWhenHideText,
  setScreenWidthWhenDisplayBurger,
  setMenuDefaultRightPosition,
  openMenuXXX,
  goDownInMenuXXX,
  goUpInMenuXXX,
  closeMenuXXX
} = navSlice.actions
