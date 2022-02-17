/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2022-02-17
 * Time: 10:41
 * About:
 *
 */
import React, {useState,useEffect} from "react"
import {IuseWindowSize, IwindowSize} from './interface'


const useWindowSize: IuseWindowSize = () => {

    const [windowSize, setWindowSize] = useState<IwindowSize>({
        width: 0,
        height: 0,
    });

    const handleResize = () =>{
        if (typeof window === 'undefined') {
            return
        }
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        })
    }



    useEffect(() => {
        if (typeof window === 'undefined') {
            return
        }

        window.addEventListener("resize", handleResize)

        handleResize()

        return () => window.removeEventListener("resize", handleResize)

    }, [])

    return windowSize
}

export default useWindowSize