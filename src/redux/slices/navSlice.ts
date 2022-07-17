import { createSlice } from '@reduxjs/toolkit'
import { g } from '@src/g'

const initialState = {
  burger: { isOpen: false },
  mediaQueryWidth: { logoExtension: 0, logoPart: 0, icon: 0, name: 0, burger: 0 },
  idsToCurrentMenuItems: ['top'],
  idsToNextMenuItems: ['top'],
  hiddenItemNames: ['Link D'],
  navItemRightPos: 0,
  menuItemHoverIndex: 0
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
    openMenuWithId: (state, action) => { state.idsToCurrentMenuItems = state.idsToNextMenuItems = ['top', action.payload] },
    closeMenu: (state) => {
      state.idsToNextMenuItems = state.idsToCurrentMenuItems = ['top']
      state.burger.isOpen = false
      state.menuItemHoverIndex = 0
      g.goDownInMenu = g.goUpInMenu = null
    },
    goDownInCurrentMenu: (state, action) => { state.idsToCurrentMenuItems = [...state.idsToCurrentMenuItems, action.payload] },
    goUpInCurrentMenu: (state) => { state.idsToCurrentMenuItems = state.idsToCurrentMenuItems.slice(0, -1) },
    goDownInNextMenu: (state, action) => { state.idsToNextMenuItems = [...state.idsToNextMenuItems, action.payload] },
    goUpInNextMenu: (state) => { state.idsToNextMenuItems = state.idsToNextMenuItems.slice(0, -1) },
    setMenuItemHoverIndex: (state, action) => { state.menuItemHoverIndex = action.payload }
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
  openMenuWithId,
  closeMenu,
  // we track the state of 'current' and 'next' menus for the slide effect, coz we actually have two parallel menus
  // 1st menu state
  goDownInCurrentMenu,
  goUpInCurrentMenu,
  // 2nd menu state
  goDownInNextMenu,
  goUpInNextMenu,
  setMenuItemHoverIndex
} = navSlice.actions
