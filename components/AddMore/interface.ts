/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2022-01-20
 * Time: 14:06
 * About:
 *
 */
import {IMetaplexDataListObject} from "../MetaplexDataForm/interface";
import {IInputCallbackParams} from "../Input/interface";


export interface IAddMoreOnChangeParams{
    id:string,
    value:{
        id:string,
        value:IInputCallbackParams
    }
}


export interface IAddMoreDefaulValues{
    [k:string]:any
}

export interface IAddMore{
    defaulValues?:IAddMoreDefaulValues[],
    inputs:IMetaplexDataListObject[],
    onChange?:(p:IAddMoreOnChangeParams)=>void
}