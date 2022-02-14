/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-09-22
 * Time: 16:32
 * About:
 *
 */
import {ReactNode} from "react"
export type ButtonVariant = 'text' | 'contained' | 'outlined' | 'round'
export type ButtonSize = 'small' | 'medium' | 'large'


export interface IButton {
    name?:string|ReactNode,
    variant?:ButtonVariant,
    size?:ButtonSize,
    disabled?:boolean,
    callback?:(v:boolean)=>void
}