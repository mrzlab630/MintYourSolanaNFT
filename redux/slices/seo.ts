/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-09-02
 * Time: 14:33
 * About:
 *
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {initialStateSEO} from '../initialState'
import {IinitialStateSEO,IgetSeoPage} from '../initialState/seo'




const chgTxt = (st:{title:string,description:string},slug?:string,invites?:string) =>{
    if(!st){
        return
    }

    const {title,description} = st || false

    let finTitle = title
    let finDescription = description

    if(slug){
        finTitle = finTitle.replace('{%slug%}',slug)
        finDescription = finDescription.replace('{%slug%}',slug)
    }
    if(invites){
        finTitle = finTitle.replace('{%invites%}',invites)
        finDescription = finDescription.replace('{%invites%}',invites)
    }

    return {
        title:finTitle,
        description:finDescription
    }

}




export const seoSlice = createSlice({
    name: 'seo',
    initialState:initialStateSEO,
    reducers: {
        getSeoPage:(
            state:IinitialStateSEO,
            action:PayloadAction<IgetSeoPage>
        ) => {
            const {page,slug,invites} = action.payload || false

            const fnd = state.header.filter(itm => itm.page === page).pop()

            const fin = fnd ? chgTxt(fnd,slug,invites ? String(invites) : undefined) : []

            state.header = fnd ? [{...fnd,...fin}] : []
        }
    }
})




export const { getSeoPage } = seoSlice.actions
export default seoSlice.reducer