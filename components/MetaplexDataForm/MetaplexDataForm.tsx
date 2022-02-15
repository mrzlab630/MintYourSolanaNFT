/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2022-01-19
 * Time: 13:45
 * About: https://docs.metaplex.com/token-metadata/v1.1.0/specification
 *
 */
import React, {FC, useState,useEffect} from "react"
import {
    IMetaplexDataAcceptTypes,
    IMetaplexDataForm,
    IMetaplexDataFormCallbackParams,
    IMetaplexDataList
} from './interface'
import classes from './MetaplexDataForm.module.scss'

import Select from "../Select"
import AddMore from "../AddMore"
import RenderLable from "../RenderLable"
import RenderBlock from "../RenderBlock"
import RenderInput from "../RenderInput"
import {IInputCallbackParams} from "../Input/interface"
import {IRenderBlockOnChangeParams} from "../RenderBlock/interface"
import Button from "../Button"
import {useAppSelector} from "../../redux/hooks"
import {RootState} from "../../redux/store"





const MetaplexDataForm: FC<IMetaplexDataForm> = ({
                                                    buttonName,
                                                     defaultData,
                                                     callback,
                                                 }) => {


    const {metaplexData} = useAppSelector((state:RootState) => state)



    const [metaData, setMetaData] = useState<{[x:string]:any}|undefined>(undefined)

    const [metadataList, setMetadataList] = useState<IMetaplexDataList[]>(metaplexData.list)

    const [metadataPropertiesList, setMetadataPropertiesList] = useState<IMetaplexDataList[]>(metaplexData.properties)

    const [metadataAttributesList, setMetadataAttributesList] = useState<IMetaplexDataList[]>(metaplexData.attributes)


    useEffect(() =>  setMetaData(defaultData),[defaultData])



    const handleGetData = (id:string) => (value:IInputCallbackParams) => {

        let itm = {[id]: value }

        switch (id) {

            case 'category':
                setMetaData(prev => {

                    if(typeof value === "string" && value?.length === 0){

                        if(prev){

                            if(Object.keys(prev.properties).length === 0){
                                delete prev.properties
                            }

                            if(prev.properties[id]){
                                delete prev.properties[id]
                            }
                        }

                        return Object.keys(prev ?? {}).length === 0 ? undefined : prev
                    }

                    if(!prev){
                        return {properties:itm}
                    }

                    return {
                                ...prev,
                                properties: {
                                    ...prev?.properties,
                                    ...itm
                                }
                            }

                })
                break

             default:
                 setMetaData(prev => {

                     if(typeof value === "string" && value?.length === 0){

                         if(prev){
                             delete prev[id]
                         }

                         return Object.keys(prev ?? {}).length === 0 ? undefined : prev
                     }

                     if(!prev){
                         return itm
                     }

                     return {...prev, ...itm}

                 })
        }



    }

    const handleGetDataObj = (id:string) => (value:IRenderBlockOnChangeParams) => {

        let itm = {[value.id]:value?.value}


        setMetaData(prev => {

                if(typeof value?.value === "string" && value?.value?.length === 0){

                    if(prev){
                        if(prev[id] && Object.keys(prev[id]).length === 0){
                            delete prev[id]
                        }

                        if(prev[id] && prev[id][value.id]){
                            delete prev[id][value.id]
                        }


                    }

                    return Object.keys(prev ?? {}).length === 0 ? undefined : prev
                }

                if(!prev){
                    return {[id]:itm}
                }

                return {
                    ...prev,
                    [id]: {
                        ...prev[id],
                        ...itm
                    }
                }
            })



    }

    const handleGetDataObjMore = (id:string) => (value:any) => {

        const addData = (trgObjArr:any) =>{

            const val = value.value.value
            const keyId = value.value.id

            const newData = !Array.isArray(trgObjArr) ? [] : trgObjArr

            let finData


            const newValTrgObj = {[keyId]: val}

            if(newData[Number(value.id)]){

                    const newObj = {
                        ...newData[Number(value.id)],
                        ...newValTrgObj
                    }

                    finData = newData.map((itm,idx) => idx === Number(value.id) ? newObj : itm)

            }else{
                finData = [...newData,newValTrgObj]
            }
            return finData

        }



        switch (id) {

            case "attributes":

              setMetaData(prev =>  ({ ...prev,[id]:addData(prev?.[id])}))

                return


            default:
                setMetaData(prev => {

                    const {properties} = prev ?? {properties:{[id]:[]}}
                    let trgObjArr = properties?.[id]

                    return {
                        ...prev,
                        properties:{
                            ...prev?.properties,
                            [id]:addData(trgObjArr)
                        }
                    }
                })
                return

        }

    }


    const handleClick = () => typeof callback === "function" ? callback(metaData as IMetaplexDataFormCallbackParams) : null





    const detectDefault = (id:string) =>{

        if(!metaData){
            return
        }

        switch (id) {
            case 'files':
            case 'category':
            case 'creators':
                return metaData?.properties?.[id]

            default:
                return metaData[id]
        }

    }

    const renderInputs = [
        ...metadataList,
        ...metadataPropertiesList,
        ...metadataAttributesList,

    ].map((itm,idx) =>{

        const renderAnyType = (type:string,itm:any,block?:string) =>{

            let defVal = detectDefault(itm.field)

            if(block){
                defVal = detectDefault(block)

                defVal = Array.isArray(defVal) ? defVal : defVal?.[itm.field]

                return <RenderBlock
                    list={itm?.list}
                    type={itm.type}
                    lable={itm.field}
                    tooltip={itm.description}
                    onChange={handleGetDataObj(block)}
                    defaultValues={defVal}
                />
            }


            switch (type) {

                case 'list':

                    return itm?.list ? <Select
                        callback={handleGetData(itm.field)}
                        width={'210px'}
                        list={itm.list}
                        defaultValue={defVal}
                    />
                        : null



                default:
                    return <RenderInput
                        onChange={handleGetData(itm.field)}
                        type={itm.type}
                        value={defVal}
                        accept={Array.isArray(itm.acceptTypes) ? itm.acceptTypes.map((itm:IMetaplexDataAcceptTypes) => `.${itm}`).join(',') : undefined}
                    />
            }
        }

        let inputClmn


        if(itm.hide){
            return
        }


        renderAnyType(itm.type,itm)

        switch (itm.type) {

            case 'object':
                inputClmn = Array.isArray(itm?.object) ? itm.object.map((itmO,idxO) => <div key={`renderInputs-${idxO}`} className={classes.row}>
                        {
                            renderAnyType(itmO.type, itmO,itm.field)
                        }
                    </div>
                ) : null

                inputClmn = <div className={classes.row}>
                        {
                            itm?.object && itm?.addMore ? <AddMore
                                                                    onChange={handleGetDataObjMore(itm.field)}
                                                                    inputs={[...itm.object]}
                                                                    defaulValues={detectDefault(itm.field)}
                                                                />
                                : inputClmn
                        }
                    </div>
                break

            default:
                inputClmn = renderAnyType(itm.type,itm)


        }


        return  <div key={`renderInputs-${idx}`} className={classes.row}>
                    <div className={classes.column}>
                        <RenderLable
                            tooltip={itm.description}
                            lable={itm.field}
                        />
                        </div>
                    {inputClmn}
                </div>

    })



const accessToSend = ():boolean => !Boolean(metaData) || Object.keys(metaData || {}).length === 0



    return <div className={classes.MetaplexDataForm}>

        <div className={classes.MetaplexDataFormWrap}>
            {
                renderInputs
            }
        </div>

        <div className={classes.buttonWrap}>
            <Button
                disabled={accessToSend()}
                callback={handleClick}
                size={'large'}
                name={buttonName}
            />
        </div>
    </div>
}

export default MetaplexDataForm
