import { useRef, useEffect } from 'react'

export function useIsInitRender() {
  const isInitRender = useRef(true)
  useEffect(() => { isInitRender.current = false }, [])
  return isInitRender.current
}
