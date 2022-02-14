/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2022-01-17
 * Time: 18:04
 * About:
 *
 */
import {JWKInterface} from "arweave/node/lib/wallet"
import {IuploadFileToArweaveLinks, IuploadFileToArweaveResult} from "./IuploadFileToArweave"



export interface ImetaplexAddDataMetadataAttributes{
    trait_type:string,
    value:string|number
}


export interface ImetaplexAddDataMetadataCollection{
    name:string,
    family:string
}

export interface ImetaplexAddDataMetadataPropertiesCollection{
    name:string,
    family:string
}

export interface ImetaplexAddDataMetadataPropertiesCreators{
    address:string,
    share:number,
    verified?:boolean
}

export interface ImetaplexAddDataMetadataPropertiesFiles{
    uri:string,
    type:string,
    cdn?:boolean
}

/*
properties.category - Supported categories:
"image" - PNG, GIF, JPG
"video" - MP4, MOV
"audio" - MP3, FLAC, WAV
"vr" - 3D models; GLB, GLTF
"html" - HTML pages; scripts and relative paths within the HTML page are also supported
 */

export type ImetaplexAddDataMetadataPropertiesCategory = 'image'|'video'|'audio'|'vr'|'html'

export interface ImetaplexAddDataMetadataProperties{
    category:ImetaplexAddDataMetadataPropertiesCategory,
    files?:ImetaplexAddDataMetadataPropertiesFiles[],
    //v1.1.0 @deprecated -> may be removed in a future release
    //https://docs.metaplex.com/token-metadata/v1.1.0/specification
    creators?:ImetaplexAddDataMetadataPropertiesCreators[]
}

export interface ImetaplexAddDataMetadata{
    name:string,
    symbol:string,
    image?:string,
    description?:string,
    seller_fee_basis_points:number,
    animation_url?:string,
    external_url?:string,
    attributes?:ImetaplexAddDataMetadataAttributes[],
    //v1.1.0 @deprecated -> may be removed in a future release
    //https://docs.metaplex.com/token-metadata/v1.1.0/specification
    collection?:ImetaplexAddDataMetadataCollection,
    properties:ImetaplexAddDataMetadataProperties

}

export interface ImetaplexAddDataParamsLogging{
    (v:string):void
}

export interface ImetaplexAddDataParams{
    walletKey: JWKInterface | "use_wallet",
    file:File,
    metadata:ImetaplexAddDataMetadata,
    logging?:boolean|ImetaplexAddDataParamsLogging
}

export interface ImetaplexAddDataResult{
    error?:string,
    json?:IuploadFileToArweaveResult,
    image?:IuploadFileToArweaveResult
}

export interface ImetaplexAddData{
    (params:ImetaplexAddDataParams):Promise<ImetaplexAddDataResult>
}