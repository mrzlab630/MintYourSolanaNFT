/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2022-01-20
 * Time: 15:01
 * About:
 *
 */
import {IInputCallbackParams, InputType} from "../Input/interface"



export interface IRenderBlockOnChangeParams{
    id:string,
    value:IInputCallbackParams
}

export interface IRenderBlock{
    defaultValues?:any,
    list?:string[],
    type:InputType | 'list',
    lable:string,
    tooltip:string,
    onChange?:(p:IRenderBlockOnChangeParams) => void
}