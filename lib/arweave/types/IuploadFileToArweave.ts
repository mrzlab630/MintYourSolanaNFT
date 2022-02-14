/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2022-01-05
 * Time: 10:38
 * About:
 *
 */
import {JWKInterface} from "arweave/node/lib/wallet";




export interface IuploadFileToArweaveTags{
    [k:string]:string|number
}

export type IuploadFileToArweaveTypes = 'text/html' | 'text/plain' | 'application/json' | 'binary'

export interface IuploadFileToArweaveParamsLogging{
    (v:string):void
}

export interface IuploadFileToArweaveParams{
    walletKey: JWKInterface | "use_wallet",
    data:any,
    type?:IuploadFileToArweaveTypes,
    logging?:boolean|IuploadFileToArweaveParamsLogging,
    timeout?:number,
    tags?:IuploadFileToArweaveTags[]
}

export interface IuploadFileToArweaveLinks{
    tx:string,
    uri:string,
    viewblock:string,
}

export interface IuploadFileToArweaveResult{
    error?:string,
    transactionId?:string,
    links?:IuploadFileToArweaveLinks
}

export interface IuploadFileToArweave{
    (params:IuploadFileToArweaveParams):Promise<IuploadFileToArweaveResult>
}
