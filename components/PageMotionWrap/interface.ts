/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-09-23
 * Time: 14:01
 * About:
 *
 */
import {Variants} from "framer-motion/types/types"


export interface IPageMotionWrapAnimation{
    visible:any,
    hidden:any,
}



export interface IPageMotionWrap{
    toggle?:boolean,
    duration?:number,
    animation:Variants
}