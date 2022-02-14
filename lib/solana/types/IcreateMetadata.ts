/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-12-29
 * Time: 17:46
 * About:
 *
 */
import {Data} from "../classes";



export interface IcreateMetadataParams{
    instructions: any[];
    data: Data;
    updateAuthority: any;
    mintKey: string;
    mintAuthorityKey: any;
    payer: string
}

export interface IcreateMetadataResult{
    error?:string,
    result?:any
}

export interface IcreateMetadata{
    (v:IcreateMetadataParams):Promise<IcreateMetadataResult>
}
