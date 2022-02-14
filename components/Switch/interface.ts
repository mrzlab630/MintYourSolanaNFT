/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-11-15
 * Time: 11:27
 * About:
 *
 */

export interface ISwitch{
    lableOn:string,
    lableOff:string,
    toggle?:boolean,
    callback:(v:boolean)=>void
}