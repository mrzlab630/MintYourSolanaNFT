/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2022-01-04
 * Time: 15:04
 * About:
 *
 */



export interface IprepPayForFilesTxnParams{
    wallet:any,
    files:(string | File)[],
}
export interface IprepPayForFilesTxnResult{
    error?:string,
    instructions?:any,
    signers?:any,
}

export interface IprepPayForFilesTxn{
    (params:IprepPayForFilesTxnParams):Promise<IprepPayForFilesTxnResult>
}