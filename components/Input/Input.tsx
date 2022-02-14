/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-09-23
 * Time: 16:05
 * About:
 *
 */
import {FC, ChangeEvent, useState, useEffect, useRef, KeyboardEvent} from "react"
import {IInput} from './interface'
import classes from './Input.module.scss'
import uniqid from 'uniqid'




const Input: FC<IInput> = ({
                            width,
                            classWrap,
                            className,
                            value,
                            accept,
                            onBlur,
                            onChange,
                            callback,
                            pressEnter,
                            placeholder,
                            type,
                            multiple,
                            label,
                            autoFocus,
                            ...res
}) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [styleType, setStyleType] = useState<string>('')
    const [idInput,setIdInput] = useState<string>('')
    const [defaultValue,setDefaultValue] = useState<string|number|undefined>(undefined)
    const [checked,setChecked] = useState<boolean>(false)
    const [showSelectedFile,setShowSelectedFile] = useState<string|undefined>(undefined)



    useEffect(() => setIdInput(uniqid()),[])


    useEffect(()=>{

        if(inputRef.current && autoFocus){
            inputRef.current.focus()
        }
    }, [autoFocus])


    useEffect(() =>{

        switch (type) {
            case "checkbox":
                setStyleType(classes.checkbox)
                setChecked(Boolean(value))
                break
            case "radio":
                setStyleType(classes.radio)
                setChecked(Boolean(value))
                break

            case "number":
                setStyleType(classes.default)
                setDefaultValue(value ? Number(value) : undefined)
                break

            case "file":
                setStyleType(classes.default)
                setDefaultValue(  undefined)
                break

            default:
                setStyleType(classes.default)
                setDefaultValue(value ? String(value) : undefined)

        }

    },[type,value])



    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {

        const val = e.target.value
        const checked = e.target.checked
        const files = e.target.files
        const res = checked || files || val


        const selectedFileListStr = files ? Object.keys(files).map(itm => files[Number(itm)].name).join(',') : undefined

        setShowSelectedFile(selectedFileListStr)

        if(onBlur && typeof onBlur === "function"){
            return onBlur(res)
        }
        if(onChange && typeof onChange === "function"){
            return onChange(res)
        }
        if(callback && typeof callback === "function"){
            return callback(res)
        }

    }

    const handleKeyDown = (e:KeyboardEvent<HTMLInputElement>) =>{
        const key = e.key

        if(key !== 'Enter'){
            return
        }

        const target = e.target as HTMLInputElement

        const val = target.value
        const checked = target.checked
        const res = checked || val

        if(pressEnter && typeof pressEnter === "function"){
            return pressEnter(res)
        }
    }



    return <div className={`${classWrap || ''} ${classes?.wrap || ''}`}>
        {
            showSelectedFile && <div className={classes.selectedFiles}>{showSelectedFile}</div>
        }
            <input
                ref={inputRef}
                style={{width}}
                id={`input-${idInput}`}
                onBlur={handleChange}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className={`${className || ''} ${classes.Input} ${styleType || ''} ${Boolean(value) ? classes.isValue : classes.notValue}`}
                {...{...res,type,defaultValue,checked,placeholder,accept,multiple}}
            />
        <label htmlFor={`input-${idInput}`}>{label}</label>
    </div>
}

export default Input