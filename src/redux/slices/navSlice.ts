import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  burger: { isOpen: false },
  mediaQueryWidth: { logoExtension: 0, logoPart: 0, icon: 0, name: 0, burger: 0 },
  idsToCurrentMenu: ['top'],
  idsToNextMenu: ['top'],
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

    openCurrentMenu: (state, action) => { state.idsToCurrentMenu = ['top', action.payload] },
    goDownInCurrentMenu: (state, action) => { state.idsToCurrentMenu = [...state.idsToCurrentMenu, action.payload] },
    goUpInCurrentMenu: (state) => { state.idsToCurrentMenu = state.idsToCurrentMenu.slice(0, -1) },
    closeCurrentMenu: (state) => { state.idsToCurrentMenu = ['top'] },

    openNextMenu: (state, action) => { state.idsToNextMenu = ['top', action.payload] },
    goDownInNextMenu: (state, action) => { state.idsToNextMenu = [...state.idsToNextMenu, action.payload] },
    goUpInNextMenu: (state) => { state.idsToNextMenu = state.idsToNextMenu.slice(0, -1) },
    closeNextMenu: (state) => { state.idsToNextMenu = ['top'] }

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

  openCurrentMenu,
  goDownInCurrentMenu,
  goUpInCurrentMenu,
  closeCurrentMenu,

  openNextMenu,
  goDownInNextMenu,
  goUpInNextMenu,
  closeNextMenu
} = navSlice.actions
