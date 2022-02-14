/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2022-01-04
 * Time: 14:30
 * About:
 *
 */


export interface IsendTransactionWithRetryParams{
    connection:any,
    wallet:any,
    instructions:any[],
    signers:any[],
    commitment?:string,
    includesFeePayer?:boolean,
    block?:any,
    beforeSend?:any,
}

export interface IsendTransactionWithRetryResult{
    txid?:string,
    slot?:number,
    error?:string
}

export interface IsendTransactionWithRetry{
    (
     params:IsendTransactionWithRetryParams
      ):Promise<IsendTransactionWithRetryResult>
}