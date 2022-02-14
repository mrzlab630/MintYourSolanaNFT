/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-10-07
 * Time: 11:19
 * About:
 *
 */


export type TINotificationType = 'error' | 'warning' | 'info' | 'success'
export type TINotificationPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center' | 'center'



export interface IAlert{
    type?:TINotificationType,
    position?:TINotificationPosition,
    title?:string
}


export interface INotification extends IAlert{
    open?:boolean,
    openDuration?:number,
    autoHideDuration?:number,
    message?:string,
}


