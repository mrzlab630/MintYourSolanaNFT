/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2022-01-20
 * Time: 15:01
 * About:
 *
 */
import React, {FC, useEffect, useState} from "react"
import {IRenderBlock} from './interface'
import classes from "./RenderBlock.module.scss"
import RenderLable from "../RenderLable"
import RenderInput from "../RenderInput";
import {IInputCallbackParams} from "../Input/interface";
import Select from "../Select";








const RenderBlock: FC<IRenderBlock> = ({
                                           list,
                                           type,
                                           lable,
                                           tooltip,
                                           defaultValues,
                                           onChange
                                       }) => {


    const [defaultValue, setDefaultValue] = useState<string|number|boolean|undefined>(undefined)

    useEffect(() => setDefaultValue(defaultValues),[defaultValues])




    const handleGetData = (id:string) => (value:IInputCallbackParams) => {

        if(typeof onChange === "function"){
            return onChange({id,value})
        }
    }


    const renderInputs = () => {
      switch (type) {

          case 'list':
              return list ? <Select
                      callback={handleGetData(lable)}
                      width={'185px'}
                      list={list}
                      defaultValue={defaultValue ? String(defaultValue) : undefined}
                  />
                  : null

          default:
              return  <RenderInput
              onChange={handleGetData(lable)}
              value={defaultValue}
              {...{type}}
          />
      }
    }


   return <div className={classes.RenderBlock}>

        <div className={classes.column}>
            <RenderLable
                tooltip={tooltip}
                lable={lable}
            />
            {
                renderInputs()
            }
        </div>

    </div>
}


export default RenderBlock