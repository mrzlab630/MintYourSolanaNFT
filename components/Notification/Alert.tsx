/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-10-07
 * Time: 12:09
 * About:
 *
 */
import {FC, ReactNode, useEffect, useState} from "react"
import {IAlert} from './interface'
import classes from "./Notification.module.scss"
import SuccessSvg from "../../assets/svg/success.svg"
import InfoSvg from "../../assets/svg/info.svg"
import WarningSvg from "../../assets/svg/warning.svg"


const Alert: FC<IAlert> = ({
                               title,
                               type,
                               position,
                               children
                           }) => {

    const [pstn, setPstn] = useState<string>(classes.positionLeftTop)
    const [background, setBackground] = useState<string>(classes.info)
    const [icon,setIcon] = useState<ReactNode>(<SuccessSvg className={classes.icon}/>)




    useEffect(() =>{

        let ps = 'top-left'

        switch (position || 'top-left') {
            case 'top-left':
                ps = classes.positionLeftTop
                break
            case 'top-right':
                ps = classes.positionRightTop
                break
            case 'bottom-left':
                ps = classes.positionLeftBottom
                break
            case 'bottom-right':
                ps = classes.positionRightBottom
                break
            case  'top-center':
                ps = classes.positionTopCenter
                break
            case 'bottom-center':
                ps = classes.positionBottomCenter
                break
            case 'center':
                ps = classes.positionCenter
                break


        }
        setPstn(ps)

    },[position])

    useEffect(() =>{

        let clr = classes.info
        let icn = <InfoSvg className={classes.icon}/>

        switch (type || 'info') {

            case "info":
                clr = classes.info
                icn = <InfoSvg className={classes.icon}/>
                break
            case "error":
                clr = classes.error
                icn = <InfoSvg className={classes.icon}/>
                break
            case "success":
                clr = classes.success
                icn = <SuccessSvg className={classes.icon}/>
                break
            case "warning":
                clr = classes.warning
                icn = <WarningSvg className={classes.icon}/>
                break

        }
        setIcon(icn)
        setBackground(clr)
    },[type])


    return <div className={`${classes.Notification} ${pstn} ${background}`}>

        <div className={classes.iconWrap}>
            {
                icon
            }
        </div>
        <div>
            {title && <div className={classes.title}>{title}</div>}
            <div className={classes.body}>
                {children}
            </div>
        </div>

    </div>
}

export default Alert