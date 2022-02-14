/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2022-01-20
 * Time: 15:05
 * About:
 *
 */
import React, {FC} from "react"
import {IRenderInput} from './interface'
import Input from "../Input"
import classes from "./RenderInput.module.scss"


const RenderInput: FC<IRenderInput> = ({
                                           width,
                                           value,
                                           onBlur,
                                           onChange,
                                           callback,
                                           pressEnter,
                                           placeholder,
                                           type,
                                           label,
                                           autoFocus,
                                           ...res
}) =>  <div className={classes.column}>
    <Input
    className={classes.input}
    {...{ width,
        value,
        onBlur,
        onChange,
        callback,
        pressEnter,
        placeholder,
        type,
        label,
        autoFocus,
        ...res}}
    />
    </div>


export default RenderInput