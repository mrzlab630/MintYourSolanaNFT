/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-10-21
 * Time: 15:50
 * About:
 *
 */



export interface IContactFormCallbackParams{
    name?:string,
    message?:string,
    email?:string
}

export interface IContactFormCallback{
    (v:IContactFormCallbackParams):void
}

export interface IContactForm{
    callback:IContactFormCallback

}