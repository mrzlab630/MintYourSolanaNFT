/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2022-01-19
 * Time: 17:40
 * About:
 *
 */

export type ISelectCallbackParam = string

export interface ISelect{
    defaultValue?:string,
    width?:string,
    list:string[],
    callback?: (v:ISelectCallbackParam)=>void
}