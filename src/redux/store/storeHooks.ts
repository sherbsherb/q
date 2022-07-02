import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

// needed for types
export const useSelectorTyped: TypedUseSelectorHook<RootState> = useSelector
export const useDispatchTyped = () => useDispatch<AppDispatch>()
