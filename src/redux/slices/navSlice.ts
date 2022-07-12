import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  burger: { isOpen: false },
  mediaQueryWidth: { logoExtension: 0, logoPart: 0, icon: 0, name: 0, burger: 0 },
  menuIdsChain: ['top'],
  nextMenuId: '',
  hiddenItemNames: ['Link D'],
  navItemRightPos: 0
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
    setNavItemRightPos: (state, action) => { state.navItemRightPos = action.payload },
    openMenu: (state, action) => { state.menuIdsChain = ['top', action.payload] },
    goDownInMenu: (state, action) => { state.menuIdsChain = [...state.menuIdsChain, action.payload] },
    goUpInMenu: (state) => { state.menuIdsChain = state.menuIdsChain.slice(0, -1) },
    closeMenu: (state) => { state.menuIdsChain = ['top'] }
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
  setNavItemRightPos,
  openMenu,
  goDownInMenu,
  goUpInMenu,
  closeMenu
} = navSlice.actions
