/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2022-02-11
 * Time: 14:33
 * About:
 *
 */

import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {initialStateDefaultNFTMetadata} from '../initialState'
import {
    IinitialStateDefaultNFTMetadata,
    IinitialStateDefaultNFTMetadataPropertiesCreators
} from "../initialState/defaultNFTMetadata";



export const defaultNFTMetadataSlice = createSlice({
    name: 'defaultNFTMetadata',
    initialState:initialStateDefaultNFTMetadata,
    reducers: {
        getDefaultNFTMetadata:(state:IinitialStateDefaultNFTMetadata) =>
        {
            state
        },
        addCreatorNFTMetadata:(state:IinitialStateDefaultNFTMetadata, action: PayloadAction<IinitialStateDefaultNFTMetadataPropertiesCreators[]>) =>
        {
            const {payload} = action

            return  {
                ...state,
                properties:{
                    ...state.properties,
                    creators:payload
                }
            }
        },

        addToDefaultNFTMetadata:(state:IinitialStateDefaultNFTMetadata, action: PayloadAction<IinitialStateDefaultNFTMetadata>) =>
        {
            const {payload} = action

            return {
                ...state,
                payload
            }
        },


    }
})




export const { getDefaultNFTMetadata,addToDefaultNFTMetadata,addCreatorNFTMetadata } = defaultNFTMetadataSlice.actions
export default defaultNFTMetadataSlice.reducer