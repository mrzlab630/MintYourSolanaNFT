/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2022-01-13
 * Time: 17:51
 * About:
 *
 */


export interface IgetDataFromArweaveResult{
    error?:string
    data?:any
}

export interface IgetDataFromArweaveParams{
    timeout?:number,
    transactionId:string
}


export interface IgetDataFromArweave{
    (params:IgetDataFromArweaveParams):Promise<IgetDataFromArweaveResult>
}