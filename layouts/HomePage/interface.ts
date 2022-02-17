/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-09-17
 * Time: 11:56
 * About:
 *
 */
import {ImetaplexAddDataMetadata, ImetaplexAddDataParams} from "../../lib/arweave/types/ImetaplexAddData"
import {ImintNFTParams, TsolanaCluster} from "../../lib/solana/types/ImintNFT";
import {JWKInterface} from "arweave/node/lib/wallet";




export interface IHomePage{
    title?:string
    info?:string,
}





export interface IuploadToArweave{
    (v:ImetaplexAddDataParams):Promise<{ imageFileUri: string; imageMetadataUri: string; error?: undefined; } | { error: string; imageFileUri?: undefined; imageMetadataUri?: undefined; }>
}

export interface ImintNFTtoSolanaParams{
    imageMetadataUri:string
}



export interface ImintNFTtoSolana{
    (v:ImintNFTParams):Promise<{ mintKey: any; error?: undefined; } | { error: string; mintKey?: undefined; }>
}


export interface IuploadAndMintParams{
    arweaveWalletKey?: JWKInterface | "use_wallet",
    file?:File,
    metadata:ImetaplexAddDataMetadata,
    arweaveUri?:string
}

export interface IuploadAndMint{
    (v:IuploadAndMintParams):Promise<{ mintKey: any; error?: undefined; } | { error: string; mintKey?: undefined; }>
}


export interface IprintResultParams{
    mintKey:string,
    solanaCluster:TsolanaCluster
}

export interface IprintResult{
    (v:IprintResultParams):Promise<any>
}