/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2022-01-19
 * Time: 13:45
 * About:
 *
 */

import {InputType} from "../Input/interface";
import {ImetaplexAddDataMetadata} from "../../lib/arweave/types/ImetaplexAddData";


export interface IMetaplexDataListObject{
    field:string,
    type:InputType | 'list',
    list?:string[],
    description:string
}

export type IMetaplexDataAcceptTypes = 'png' | 'gif' | 'jpg' | 'mp4' | 'mov' | 'mp3' | 'flac' | 'wav' | 'glb' | 'gltf' | 'html'

export interface IMetaplexDataList{
    hide?:boolean,
    field:string,
    type:InputType | 'list' | 'object' | 'upload_file',
    acceptTypes?:IMetaplexDataAcceptTypes[],
    object?:IMetaplexDataListObject[]
    list?:string[],
    addMore?:boolean,
    description:string
}

export interface IMetaplexDataFormCallbackParams extends ImetaplexAddDataMetadata{
    [k:string]:any
}

export interface IMetaplexDataFormCallback{
    (p?:IMetaplexDataFormCallbackParams):void
}

export interface IMetaplexDataFormDefaultData{
    [k:string]:any
}


export interface IMetaplexDataForm{
    buttonName:string,
    defaultData?:IMetaplexDataFormDefaultData,
    callback?:IMetaplexDataFormCallback

}