/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-12-29
 * Time: 17:05
 * About:
 *
 */
import {INFTmetadata} from "./INFTmetadata"

export interface ImintNFTResult{
    error?:string,
    result?:{
        mintKey: string;
        metadataAccount: string;
        account: string
    }
}

export type TsolanaCluster = 'devnet'|'testnet'|'mainnet-beta';

export interface ImintNFTParams{
    cluster:TsolanaCluster;
    wallet: any;
    metadata: INFTmetadata
}

export interface ImintNFT{
    (v:ImintNFTParams):Promise<any>
}