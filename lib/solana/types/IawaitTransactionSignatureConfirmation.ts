/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-12-29
 * Time: 16:19
 * About:
 *
 */


export interface IawaitTransactionSignatureConfirmationResult{
   slot?: number,
   confirmations?: number,
   error?:string


}
export interface IawaitTransactionSignatureConfirmationParams{
    txid:string,
    timeout:number,
    connection:any,
    commitment:string, //'recent',
    queryStatus:boolean, //false,
}

export interface IawaitTransactionSignatureConfirmation {
    (v:IawaitTransactionSignatureConfirmationParams):Promise<IawaitTransactionSignatureConfirmationResult>
}