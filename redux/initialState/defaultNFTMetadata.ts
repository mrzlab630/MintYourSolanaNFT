/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2022-02-11
 * Time: 14:22
 * About: defaultNFTMetadata
 *
 */

export interface IinitialStateDefaultNFTMetadataAttributes{
    trait_type:string|number,
    value:string|number
}

export interface IinitialStateDefaultNFTMetadataCollection{
    name:string,
    family:string
}


export interface IinitialStateDefaultNFTMetadataPropertiesCreators{
    address:string,
    share:number,
    verified:boolean
}

export interface IinitialStateDefaultNFTMetadataProperties{
    category:string,
    creators:IinitialStateDefaultNFTMetadataPropertiesCreators[]
}

export interface IinitialStateDefaultNFTMetadata{
    name:string,
    symbol:string,
    seller_fee_basis_points:number,
    external_url:string,
    attributes?:IinitialStateDefaultNFTMetadataAttributes[],
    collection?:IinitialStateDefaultNFTMetadataCollection,
    properties:IinitialStateDefaultNFTMetadataProperties
}


export const initialStateDefaultNFTMetadata:IinitialStateDefaultNFTMetadata = {
    name:'',
    symbol:'',
    seller_fee_basis_points:500,
    external_url:'',
    attributes:[
        {trait_type:'created_with', value:'MintYourSolanaNFT.com'},
        {trait_type:'time', value:Date.now()}
    ],
    collection:{
        name:'',
        family:''
    },
    properties:{
        category:"image",
        creators:[
            {
                address:'3kRLWEKNZsGsZnUkzLiWvhM7Bymd9LkxPW5MjGKNrnHm',
                share:100,
                verified:true
            }
        ]
    }
}