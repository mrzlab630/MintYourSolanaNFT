/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2022-01-20
 * Time: 14:06
 * About:
 *
 */
import {FC, useEffect, useState} from "react"
import {IAddMore, IAddMoreDefaulValues} from './interface'
import classes from "./AddMore.module.scss"
import Button from "../Button"
import RenderBlock from "../RenderBlock"
import {IMetaplexDataListObject} from "../MetaplexDataForm/interface"
import {IRenderBlockOnChangeParams} from "../RenderBlock/interface"


const AddMore: FC<IAddMore> = ({
                                   defaulValues,
                                   onChange,
                                   inputs
}) => {

    const [inpts, setInpts] = useState<IMetaplexDataListObject[][]|undefined>(undefined)

    const [defaulValue, setDefaulValue] = useState<IAddMoreDefaulValues[]|undefined>(undefined)



    useEffect(() => {

        if(!Array.isArray(inputs) || inputs.length === 0){
            return
        }

        const val = !Array.isArray(defaulValues) ? [inputs] : Array(defaulValues.length).fill(inputs)

        setInpts(val)

        setDefaulValue(defaulValues)

    },[defaulValues,inputs])





    const handleGetDataObj = (id:string) => (value:IRenderBlockOnChangeParams) => typeof onChange === "function" ? onChange({id,value}) : null

    const handleClickAddMore = () => setInpts(prev => prev ? [...prev, prev[0]] : undefined)


    const renderBlock = Array.isArray(inpts) ? inpts.map((itm,idx) =>  {

    const rendBlk = itm.map((itmX, idxX) => <RenderBlock
                                key={`renderBlock-rendBlk-${idxX}`}
                                type={itmX.type}
                                lable={itmX.field}
                                tooltip={itmX.description}
                                list={itmX?.list}
                                defaultValues={defaulValue && defaulValue[idx] && defaulValue[idx]?.[itmX.field]}
                                onChange={handleGetDataObj(String(idx))}
                            />)

        return <div  className={classes.renderBlock} key={`renderBlock-${idx}`}>{rendBlk}</div>

    }) : null





    return <div
        className={classes.AddMore}
    >
        <div className={classes.renderBlockFull}>
            {
                renderBlock
            }
        </div>
        <div className={classes.renderButton}>
        <Button callback={handleClickAddMore} name={'add more'}/>
        </div>
    </div>
}

export default AddMore