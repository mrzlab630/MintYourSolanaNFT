/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2022-01-05
 * Time: 16:00
 * About:
 *
 */



export interface IstatusTransactionConfirmed{
    block_height: number
    block_indep_hash:string,
    number_of_confirmations: number
}

export interface IstatusTransactionResult{
    error?:string,
    confirmed?:IstatusTransactionConfirmed
}
export interface IawaitTransactionConfirmationParamsLogging{
    (v:string):void
}

export interface IawaitTransactionConfirmationParams {
    transactionId:string,
    arweave:any,
    timeout?:number,
    logging?:boolean|IawaitTransactionConfirmationParamsLogging
}
export interface IawaitTransactionConfirmationStatus{
    code:number,
    done:boolean,
    info?:any,
    error?:string,
    logging?:string,
}


export interface IawaitTransactionConfirmation {
    (params:IawaitTransactionConfirmationParams):Promise<IstatusTransactionResult>
}