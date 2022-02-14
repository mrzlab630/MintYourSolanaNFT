/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-10-21
 * Time: 16:02
 * About:
 *
 */

export interface ITextarea {
    classWrap?:string,
    classTextarea?:string,
    classLabel?:string,
    label?:string,
    placeholder?:string,
    defaultValue?:string,
    borderLight?:boolean,
    onChange?:(str:string) => void
}