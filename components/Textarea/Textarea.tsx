/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-10-21
 * Time: 16:02
 * About:
 *
 */
import {ChangeEvent, FC, ClipboardEvent, useEffect, useState} from "react"
import {ITextarea} from './interface'
import classes from './Textarea.module.scss'
import uniqid from "uniqid";

const Textarea: FC<ITextarea> = ({
                                     classWrap,
                                     classTextarea,
                                     classLabel,
                                     label,
                                     placeholder,
                                     defaultValue,
                                     borderLight,
                                     onChange
}) => {
    const [idTextarea,setIdTextarea] = useState<string>('')

    useEffect(() => setIdTextarea(uniqid()),[])



    const handleChange = (e:ChangeEvent<HTMLTextAreaElement>) =>{

        const val = e.target.value

        if(typeof onChange !=="function"){
            return
        }

        onChange(val)
    }

    const handlePaste = (e:ClipboardEvent<HTMLTextAreaElement>) => {
        const val = e.clipboardData.getData('text/plain') //('text/html')//
        //e.preventDefault()
        if(typeof onChange !=="function"){
            return
        }
        onChange(val)

    }


    return <div className={`${classes.Textarea} ${classWrap || ''}`}>
        {
            label &&  <label
                            className={`${classLabel || ''}`}
                        >
                         {label}
                        </label>
        }
        <textarea
            id={`textarea-${idTextarea}`}
            className={`${classTextarea || ''} ${borderLight ? classes.borderLight : classes.border}`}
            onChange={handleChange}
            onPaste={handlePaste}
            {...{placeholder,defaultValue}}
        />
    </div>

}

export default Textarea