import { isOverflown } from '@src/functions/isOverflown'

const shrinkElementSlightly = (element) => { element.style.width = element.offsetWidth - 10 + 'px' }

export function calcNavMediaQueryParams(nav, logo) {
  const gapAfterLogoWhenMediaQueryKicksIn = 50
  nav.style.width = 1000 + 'px'

  // get width when hide '.app' from logo
  while (!isOverflown(logo)) shrinkElementSlightly(nav)
  const screenWidthWhenHideLogoExtension = nav.offsetWidth + gapAfterLogoWhenMediaQueryKicksIn
  nav.querySelector('.app-ext').style.display = 'none'
  nav.style.width = nav.offsetWidth + 100 + 'px'

  // get width when hide 'uotation' from logo
  while (!isOverflown(logo)) shrinkElementSlightly(nav)
  const screenWidthWhenHideLogoPart = nav.offsetWidth + gapAfterLogoWhenMediaQueryKicksIn
  nav.querySelector('.uotation').style.display = 'none'
  nav.style.width = nav.offsetWidth + 100 + 'px'

  // get width when hide icons
  while (!isOverflown(logo)) shrinkElementSlightly(nav)
  const screenWidthWhenHideIcon = nav.offsetWidth + gapAfterLogoWhenMediaQueryKicksIn
  Array.from(nav.querySelectorAll('.icon-round-wrapper')).forEach((el) => { el.style.display = 'none' })
  nav.style.width = nav.offsetWidth + 100 + 'px'

  // get width when hide text
  while (!isOverflown(logo)) shrinkElementSlightly(nav)
  const screenWidthWhenHideText = nav.offsetWidth + gapAfterLogoWhenMediaQueryKicksIn
  Array.from(nav.querySelectorAll('.nav-item-text')).forEach((el) => { el.style.display = 'none' })
  Array.from(nav.querySelectorAll('.icon-round-wrapper')).forEach((el) => { el.style = '' })
  nav.style.width = nav.offsetWidth + 100 + 'px'

  // get width when show burger
  while (!isOverflown(logo)) shrinkElementSlightly(nav)
  const screenWidthWhenDisplayBurger = nav.offsetWidth + gapAfterLogoWhenMediaQueryKicksIn

  // show elements back on screen after calculation
  nav.querySelector('.app-ext').style = ''
  nav.querySelector('.uotation').style = ''
  Array.from(nav.querySelectorAll('.icon-round-wrapper')).forEach((el) => { el.style = '' })
  Array.from(nav.querySelectorAll('.nav-item-text')).forEach((el) => { el.style = '' })
  nav.style = ''

  return {
    screenWidthWhenHideLogoExtension,
    screenWidthWhenHideLogoPart,
    screenWidthWhenHideIcon,
    screenWidthWhenHideText,
    screenWidthWhenDisplayBurger
  }
}
