import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  burger: { isOpen: false },
  mediaQueryWidth: { logoExtension: 0, logoPart: 0, icon: 0, name: 0, burger: 0 },
  idsToCurrentMenu: ['top'],
  idsToNextMenu: ['top'],
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
    openMenu: (state, action) => { state.idsToCurrentMenu = state.idsToNextMenu = ['top', action.payload] },
    closeMenu: (state) => {
      state.idsToNextMenu = state.idsToCurrentMenu = ['top']
      state.burger.isOpen = false
      state.menuItemHoverIndex = 0
    },
    goDownInCurrentMenu: (state, action) => { state.idsToCurrentMenu = [...state.idsToCurrentMenu, action.payload] },
    goUpInCurrentMenu: (state) => { state.idsToCurrentMenu = state.idsToCurrentMenu.slice(0, -1) },
    goDownInNextMenu: (state, action) => { state.idsToNextMenu = [...state.idsToNextMenu, action.payload] },
    goUpInNextMenu: (state) => { state.idsToNextMenu = state.idsToNextMenu.slice(0, -1) },
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
  openMenu,
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
