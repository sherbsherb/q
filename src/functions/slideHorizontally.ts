import { gsap } from 'gsap'

type Args = {
  el: HTMLElement
  duration?: number
  xPercentFrom?: number
  xPercentTo?: number
  where?: 'to right' | 'to left' | 'from right' | 'from left'
}

export function slideHorizontally({ el, duration, xPercentFrom, xPercentTo, where }: Args) {
  duration = duration || 0.35
  xPercentFrom = xPercentFrom || 0
  xPercentTo = xPercentTo || 100

  if (where === 'to right') {
    xPercentFrom = 0
    xPercentTo = 100
  }

  if (where === 'to left') {
    xPercentFrom = 0
    xPercentTo = -100
  }

  if (where === 'from right') {
    xPercentFrom = 100
    xPercentTo = 0
  }

  if (where === 'from left') {
    xPercentFrom = -100
    xPercentTo = 0
  }

  gsap.fromTo(el, { xPercent: xPercentFrom }, { duration, xPercent: xPercentTo })
}
