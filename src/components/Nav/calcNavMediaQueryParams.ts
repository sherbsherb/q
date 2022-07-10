import { isOverflown } from '@src/functions/isOverflown'

const shrinkElementSlightly = (el: HTMLElement) => { el.style.width = el.offsetWidth - 10 + 'px' }

export function calcNavMediaQueryParams(nav: HTMLElement, logo: HTMLElement) {
  const gapAfterLogoWhenMediaQueryKicksIn = 50
  nav.style.width = 1000 + 'px'

  // get width when hide '.app' from logo
  while (!isOverflown(logo)) shrinkElementSlightly(nav)
  const screenWidthWhenHideLogoExtension = nav.offsetWidth + gapAfterLogoWhenMediaQueryKicksIn
  const aptExt = nav.querySelector('.app-ext')! as HTMLElement
  aptExt.style.display = 'none'
  nav.style.width = nav.offsetWidth + 100 + 'px'

  // get width when hide 'uotation' from logo
  while (!isOverflown(logo)) shrinkElementSlightly(nav)
  const screenWidthWhenHideLogoPart = nav.offsetWidth + gapAfterLogoWhenMediaQueryKicksIn
  const uotation = nav.querySelector('.uotation')! as HTMLElement
  uotation.style.display = 'none'
  nav.style.width = nav.offsetWidth + 100 + 'px'

  // get width when hide icons
  while (!isOverflown(logo)) shrinkElementSlightly(nav)
  const screenWidthWhenHideIcon = nav.offsetWidth + gapAfterLogoWhenMediaQueryKicksIn
  const iconWrappers = nav.querySelectorAll('.icon-round-wrapper')
  const iconWrappersArr = Array.from(iconWrappers)
  iconWrappersArr.forEach((el) => { (el as HTMLElement).style.display = 'none' })
  nav.style.width = nav.offsetWidth + 100 + 'px'

  // get width when hide text
  while (!isOverflown(logo)) shrinkElementSlightly(nav)
  const screenWidthWhenHideText = nav.offsetWidth + gapAfterLogoWhenMediaQueryKicksIn
  const navItems = nav.querySelectorAll('.nav-item-text')
  const navItemsArr = Array.from(navItems)
  navItemsArr.forEach((el) => { (el as HTMLElement).style.display = 'none' })
  iconWrappersArr.forEach((el) => { (el as HTMLElement).style.display = '' })
  nav.style.width = nav.offsetWidth + 100 + 'px'

  // get width when show burger
  while (!isOverflown(logo)) shrinkElementSlightly(nav)
  const screenWidthWhenDisplayBurger = nav.offsetWidth + gapAfterLogoWhenMediaQueryKicksIn

  // show elements back on screen after calculation
  aptExt.setAttribute('style', '')
  uotation.setAttribute('style', '')
  iconWrappersArr.forEach((el) => { (el as HTMLElement).setAttribute('style', '') })
  navItemsArr.forEach((el) => { (el as HTMLElement).setAttribute('style', '') })
  nav.setAttribute('style', '')

  return {
    screenWidthWhenHideLogoExtension,
    screenWidthWhenHideLogoPart,
    screenWidthWhenHideIcon,
    screenWidthWhenHideText,
    screenWidthWhenDisplayBurger
  }
}
