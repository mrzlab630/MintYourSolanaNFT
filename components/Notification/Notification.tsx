/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-10-07
 * Time: 11:19
 * About:
 *
 */
import {FC, useEffect, useState} from "react"
import {INotification} from './interface'
import Alert from "./Alert";
import PageMotionWrap from "../PageMotionWrap";
import classes from "./Notification.module.scss";
import {Variants} from "framer-motion/types/types";




const Notification: FC<INotification> = ({
                                             open,
                                             autoHideDuration,
                                             openDuration,
                                             message,
                                             position,
                                             ...res}) => {


    const [duration, setDuration] = useState<number|undefined>(.8)
    const [toggle, setToggle] = useState<boolean>(false)

    const [animation, setAnimation] = useState<Variants>({
        visible: { opacity: 1, x: 50, y: 30 },
        hidden: { opacity: 0, x: 50, y: -30 }
    })

    useEffect(() =>{
        if(openDuration){
            setDuration(openDuration)
        }
    },[openDuration])

    useEffect(() =>{

        let ps:Variants = {
            visible: { opacity: 1, x: 50, y: 30 },
            hidden: { opacity: 0, x: 50, y: -30 }
        }

        switch (position || 'top-left') {

            case 'top-left':
            case 'top-right':
            case  'top-center':
                ps = {
                    visible: { opacity: 1, x: 0, y: 30 },
                    hidden: { opacity: 0, x: 0, y: -30 }
                }
                break


            case 'bottom-left':
            case 'bottom-right':
            case 'bottom-center':
                ps = {
                    visible: { opacity: 1, x: 0, y: '95vh' },
                    hidden: { opacity: 0, x: 0, y: '110vh' }
                }
                break
            case 'center':
                ps = {
                    visible: { opacity: 1, x: 0, y: '45vh' },
                    hidden: { opacity: 0, x: 0, y: -30 }
                }
                break


        }
        setAnimation(ps)

    },[position])

    useEffect(() =>{

        if(open && autoHideDuration){
            setTimeout(() => {
                setToggle(false)
                setTimeout(() =>  setToggle(true), autoHideDuration)
            }, autoHideDuration)

        }

    },[open,autoHideDuration])



    return open ? <div className={`${classes.NotificationWrap}`}>
                        <PageMotionWrap
                            {...{duration,animation,toggle}}
                        >
                            <Alert
                                {...{position}}
                                {...res}
                            >{message}</Alert>
                        </PageMotionWrap>
                    </div>
                : <></>
}

export default Notification