/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2022-02-11
 * Time: 13:01
 * About:
 *
 */

import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {initialStateSettings} from '../initialState'
import {IinitialStateSettings, TsolanaNet} from '../initialState/settings'



export const settingsSlice = createSlice({
    name: 'settings',
    initialState:initialStateSettings,
    reducers: {
        getTransactionPrice:(state:IinitialStateSettings) =>
        {
            state.transactionPrice
        },
        addSolanaNet:(state:IinitialStateSettings,action: PayloadAction<TsolanaNet>) =>
        {
            state.solanaNet = action.payload
        }
    }
})




export const { getTransactionPrice,addSolanaNet } = settingsSlice.actions
export default settingsSlice.reducer