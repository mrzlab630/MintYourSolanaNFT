/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-10-18
 * Time: 16:43
 * About:
 *
 */
import {MouseEvent, FC, useRef, useEffect, useState} from "react"
import {IDialog} from './interface'
import  classes from './Dialog.module.scss'
import PageMotionWrap from "../PageMotionWrap"



const Dialog: FC<IDialog> = ({
                                 open,
                                 children,
                                 isClickOut
}) =>  {
    const ref = useRef<HTMLDivElement>(null)

    const handleClickOut = (e: MouseEvent<HTMLDivElement>) => {
        if(ref?.current && !ref.current.contains(e.target as Node)){
          return typeof isClickOut === "function" && isClickOut(true)
        }
    }


    return open ?  <PageMotionWrap
                        animation={{
                            visible: { opacity: 1, x: 0, y: 0 },
                            hidden: { opacity: 0, x: 0, y: 0 }
                        }}
                        duration={.3}
                    >
                        <div
                            className={classes.Dialog}
                            onClick={handleClickOut}
                        >
                            <div
                                className={classes.wrap}
                                ref={ref}
                            >
                                <div className={classes.content}>
                                    {children}
                                </div>
                            </div>
                        </div>
                    </PageMotionWrap>
        : <></>
}


export default Dialog