/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-09-02
 * Time: 18:10
 * About:
 *
 */
import {IinitialStateSEOParamsTwitter} from "../../redux/initialState/seo";


export interface ISEOHeadTwitter{
    title?:string,
    description?:string,
    image?:string,
    card?:'summary_large_image'|'app'|'summary'|'player',
    creator?:string,
}


export interface ISEOHead{
    type?:string,
    siteName?:string,
    url?:string,
    title?:string,
    description?:string,
    image?:string,
    twitter?:IinitialStateSEOParamsTwitter
}