/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-09-23
 * Time: 14:00
 * About:
 *
 */
import {FC, useEffect, useState} from "react"
import {IPageMotionWrap} from './interface'
import {motion} from "framer-motion"
import classes from "./PageMotionWrap.module.scss"



const PageMotionWrap: FC<IPageMotionWrap> = ({
                                                 children,
                                                 toggle,
                                                 animation,
                                                 duration
}) => {

    const [isMove,setIsMove] = useState<boolean>(false)



    useEffect(() => {
        setTimeout(() => setIsMove(!Boolean(toggle)), 800)
        return () => setIsMove(Boolean(toggle))
    },[toggle])



    return   <motion.div
        className={classes.PageMotionWrap}
        initial="hidden"
        variants={animation}
        animate={ isMove ? 'visible' : 'hidden'}
        transition={{
            duration: duration || .8,
            type: 'cubic-bezier(0.895, 0.03, 0.685, 0.22)',
        }}

    >
                    {children}
    </motion.div>
}

export default PageMotionWrap