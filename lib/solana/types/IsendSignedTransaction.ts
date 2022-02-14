/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2022-01-04
 * Time: 11:28
 * About:
 *
 */


export interface IsendSignedTransactionParams {
    signedTransaction:any,
    connection:any,
    timeout?:number,
}

export interface IsendSignedTransactionResult {
    txid?:string,
    slot?:number,
    error?:string
}


export interface IsendSignedTransaction {
    (params:IsendSignedTransactionParams):Promise<IsendSignedTransactionResult>
}