import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../index'


// We have to use the withTypes method to keep the types of our store
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()