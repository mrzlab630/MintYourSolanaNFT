/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-09-17
 * Time: 11:38
 * About:
 *
 */

import { combineReducers ,configureStore, ThunkAction,Action } from '@reduxjs/toolkit'

import {
    seoReducer,
    settingsSlice,
    defaultNFTMetadataSlice,
    metaplexDataSlice
} from './slices'


export const rootReducer = combineReducers({
    seo:seoReducer,
    settings:settingsSlice,
    defaultNFTMetadata:defaultNFTMetadataSlice,
    metaplexData:metaplexDataSlice
})


export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})


export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export type appThunkAction<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>