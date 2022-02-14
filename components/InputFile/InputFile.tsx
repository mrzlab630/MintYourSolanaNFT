/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2022-02-10
 * Time: 17:29
 * About:
 *
 */
import React, {ChangeEvent, FC, useRef} from "react"
import {IInputFile} from './interface'
import Button from "../Button"
import classes from './InputFile.module.scss'


const InputFile: FC<IInputFile> = ({onChange, ...res}) => {

    const hiddenFileInput = useRef<HTMLInputElement>(null)

    const handleClick = () => hiddenFileInput?.current && hiddenFileInput?.current.click()


    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
         const filesUploaded = e.target.files

        if(typeof onChange !== "function" || !filesUploaded){
            return
        }

        onChange(filesUploaded)
    }


    return  <div className={classes.InputFile}>
        <Button
            callback={handleClick}
            {...res}
        />

        <input type="file"
               ref={hiddenFileInput}
               onChange={handleChange}
               className={classes.input}
        />
    </div>
}

export default InputFile