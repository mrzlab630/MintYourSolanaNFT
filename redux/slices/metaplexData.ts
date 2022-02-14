/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2022-02-11
 * Time: 16:26
 * About:
 *
 */

import {createSlice} from '@reduxjs/toolkit'
import {initialStateMetaplexData} from '../initialState'
import {IinitialStateMetaplexData} from "../initialState/metaplexData"



export const metaplexDataSlice = createSlice({
    name: 'metaplexData',
    initialState:initialStateMetaplexData,
    reducers: {
        getMetaplexData:(state:IinitialStateMetaplexData) =>
        {
            state
        }
    }
})




export const { getMetaplexData } = metaplexDataSlice.actions
export default metaplexDataSlice.reducer