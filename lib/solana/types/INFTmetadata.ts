/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2022-01-04
 * Time: 14:50
 * About:
 *
 */

export interface INFTmetadataAttributes {
    trait_type:string;
    value:string|number;
}
export interface INFTmetadataPropertiesFiles {
    uri:string;
    type:string;
}
export interface INFTmetadataPropertiesCreators {
    address:string;
    verified:1|0;
    share:number;

}
export interface INFTmetadataProperties {
    creators?: INFTmetadataPropertiesCreators[],
    files: INFTmetadataPropertiesFiles[],
    category:string;
}
export interface INFTmetadataCreators{
    address:string,
    verified:boolean,
    share:number
}
export interface INFTmetadata{
    name: string;
    symbol: string;
    uri: string;
    sellerFeeBasisPoints: number;
    creators:INFTmetadataCreators[]
}