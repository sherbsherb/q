import { isOverflown } from '@src/functions/isOverflown'

const shrinkElementSlightly = (element) => { element.style.width = element.offsetWidth - 10 + 'px' }

export function calcMediaQueriesParams(nav, logo) {
  const gapBeforeLogo = 50
  nav.style.width = 1000 + 'px'

  // get width when hide '.app' from logo
  while (!isOverflown(logo)) shrinkElementSlightly(nav)
  const screenWidthWhenHideLogoExtension = nav.offsetWidth + gapBeforeLogo
  nav.querySelector('.app-ext').style.display = 'none'
  nav.style.width = nav.offsetWidth + 100 + 'px'

  // get width when hide 'uotation' from logo
  while (!isOverflown(logo)) shrinkElementSlightly(nav)
  const screenWidthWhenHideLogoPart = nav.offsetWidth + gapBeforeLogo
  nav.querySelector('.uotation').style.display = 'none'
  nav.style.width = nav.offsetWidth + 100 + 'px'

  // get width when hide icons
  while (!isOverflown(logo)) shrinkElementSlightly(nav)
  const screenWidthWhenHideIcon = nav.offsetWidth + gapBeforeLogo
  Array.from(nav.querySelectorAll('.icon-round-wrapper')).forEach((el) => { el.style.display = 'none' })
  nav.style.width = nav.offsetWidth + 100 + 'px'

  // get width when hide text
  while (!isOverflown(logo)) shrinkElementSlightly(nav)
  const screenWidthWhenHideText = nav.offsetWidth + gapBeforeLogo
  Array.from(nav.querySelectorAll('.nav-item-text')).forEach((el) => { el.style.display = 'none' })
  Array.from(nav.querySelectorAll('.icon-round-wrapper')).forEach((el) => { el.style = '' })
  nav.style.width = nav.offsetWidth + 100 + 'px'

  // get width when show burger
  while (!isOverflown(logo)) shrinkElementSlightly(nav)
  const screenWidthWhenDisplayBurger = nav.offsetWidth + gapBeforeLogo

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
