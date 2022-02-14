/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-09-02
 * Time: 14:52
 * About:
 *
 */

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type {RootState, AppDispatch} from './store'


const useAppDispatch = () => useDispatch<AppDispatch>()
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


export {
    useAppDispatch,
    useAppSelector
}