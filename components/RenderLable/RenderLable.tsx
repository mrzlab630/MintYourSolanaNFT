/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2022-01-20
 * Time: 14:52
 * About:
 *
 */
import React, {FC} from "react"
import {IRenderLable} from './interface'
import Tooltip from "../Tooltip"
import classes from './RenderLable.module.scss'




const RenderLable: FC<IRenderLable> = ({tooltip,lable}) => <label
    className={classes.RenderLable}
>
    {
        tooltip ? <Tooltip position={'top'} title={tooltip}>{lable?.replace(/_/g,' ')}</Tooltip>
                : lable?.replace(/_/g,' ')
    }

</label>

export default RenderLable