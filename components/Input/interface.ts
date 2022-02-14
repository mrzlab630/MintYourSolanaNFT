/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-09-23
 * Time: 16:06
 * About:
 *
 */



export type InputType ='button'|'checkbox'|'file'|'hidden'|'image'|'password'|'radio'|'reset'|'submit'|'text'|'color'|'date'|'datetime'|'datetime-local'|'email'|'number'|'range'|'search'|'tel'|'time'|'url'|'month'|'week'





export type  IInputCallbackParams = string | boolean | number | FileList


export interface IInput {
    placeholder?:string,
    autoFocus?:boolean,
    width?:string|number,
    label?:string,
    type:InputType,
    accept?:string,
    multiple?:boolean,
    name?:string,
    value?:string | number | boolean,
    src?:string,
    min?:number,
    max?:number,
    classWrap?:string,
    className?:string,
    onBlur?:(v: IInputCallbackParams) => void,
    onChange?:(v: IInputCallbackParams) => void,
    callback?:(v: IInputCallbackParams) => void
    pressEnter?:(v: IInputCallbackParams) => void
}