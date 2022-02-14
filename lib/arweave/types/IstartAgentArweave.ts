/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2022-01-13
 * Time: 17:57
 * About:
 *
 */
import Arweave from "arweave/node/common"


export interface IstartAgentArweaveParams {
    logging?:boolean,
    timeout?:number
}

export interface IstartAgentArweaveResult{
    error?:string,
    agent?:Arweave
}

export interface IstartAgentArweave{
    (params:IstartAgentArweaveParams):IstartAgentArweaveResult
}