/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2022-01-17
 * Time: 18:04
 * About:
 *
 */
import {ImetaplexAddData} from "./types/ImetaplexAddData"
import {uploadDataToArweave} from "./index"
import {IuploadFileToArweaveTags} from "./types/IuploadFileToArweave"
import loggingInfo from "../../utils/loggingInfo"





const metaplexAddData:ImetaplexAddData = async function ({
                                                       walletKey,
                                                       file,
                                                       logging,
                                                       metadata
                                                   }){
try {

    if(!metadata){
        throw new Error("metadata is empty")
    }
    if(!file){
        throw new Error("file is empty")
    }

    const {attributes} = metadata

    const fileType = file.type
    const fileNameType = file?.name ? file.name.split('.')[1] : null

    const tags:IuploadFileToArweaveTags[]|undefined = attributes ? attributes.map(itm => ({[String(itm.trait_type)]:itm.value})) : undefined

    const uploadFile = await uploadDataToArweave({
        walletKey,
        data:file,
        logging,
        tags
    })

    const {
        error:uploadFileErr,
        links
    } = uploadFile


    if(uploadFileErr || !links){
        throw  new Error(uploadFileErr || "can't upload file")
    }

    const {uri} = links

            loggingInfo({
                str:`uri: ${uri}`,
                callback:logging
            })


            loggingInfo({
                str:`metadata creation`,
                callback:logging
            })



    const image = fileNameType ? `${uri}?ext=${fileNameType}` : uri

    const imageArweaveData = {
                            uri:image,
                            type: fileType
                        }

    const newMetadata = {
        ...metadata,
        image,
        properties:{
            ...metadata.properties,
            files:[imageArweaveData]
        }
    }



    loggingInfo({
        str:`metadata ready`,
        callback:logging
    })



    const uploadMetaData= await uploadDataToArweave({
        walletKey,
        data:JSON.stringify(newMetadata),
        type:'application/json',
        logging
    })

    if(uploadMetaData?.error || !uploadMetaData?.links){
        throw  new Error(uploadMetaData?.error || "can't upload meta data")
    }

    const {uri:uriMetadata} = uploadMetaData?.links

    loggingInfo({
        str:`uri: ${uriMetadata}`,
        callback:logging
    })

    loggingInfo({
        str:`File and metadata successfully uploaded to Arweave`,
        callback:logging
    })


    return {
        image:uploadFile,
        json:uploadMetaData
    }


}catch (e) {
    return {error:(e as any).message}
}
}


export default metaplexAddData