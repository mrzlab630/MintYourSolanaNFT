/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-09-22
 * Time: 16:31
 * About:
 *
 */
import {FC, useEffect, useState} from "react"
import {IButton} from './interface'
import classes from './Button.module.scss'



const Button: FC<IButton> = ({
                                 name,
                                 disabled,
                                 variant,
                                 size,
                                 children,
                                 callback
}) => {


    const [style,setStyle] = useState<string>(classes.contained)
    const [styleStyle,setStyleStyle] = useState<string>(classes.medium)


    useEffect(() =>{

        let styleVal

        switch (size || 'medium'){

            case "small":
                styleVal = classes.small
                break

            case "medium":
                styleVal = classes.medium
                break

            case 'large':
                styleVal = classes.large
                break

            default:
                styleVal = classes.contained

        }

        setStyleStyle(styleVal)


    },[size])

    useEffect(() =>{

        let styleVal

        switch (variant || 'contained'){

            case "text":
                styleVal = classes.text
                break

            case 'outlined':
                styleVal = classes.outlined
                break

            case 'round':
                styleVal = classes.round
                break

            default:
                styleVal = classes.contained

        }

        setStyle(styleVal)


    },[variant])


    const handleClick = () => {
      if(typeof callback !== "function"){
            return
      }
        callback(true)
    }




    return <button
        {...{disabled}}
        className={`${style || ''} ${styleStyle || ''} ${disabled ? `disabled ${classes.disabled}` : ''}`}
        onClick={handleClick}
    >{children || name}</button>
}

export default Button