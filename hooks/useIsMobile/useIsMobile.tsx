/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2022-02-17
 * Time: 11:48
 * About:
 *
 */
import React, {useEffect,useState} from "react"
import {IuseIsMobile} from './interface'


const useIsMobile: IuseIsMobile = () => {

    const [isMobile, setIsMobile] = useState<boolean>(false)


    useEffect(() => {

        if (typeof window === 'undefined' || typeof navigator === 'undefined') {
            return
        }

        let hasTouchScreen = false;
        if ("maxTouchPoints" in navigator) {
            hasTouchScreen = navigator.maxTouchPoints > 0
        } else if ("msMaxTouchPoints" in navigator) {
            //@ts-ignore
            hasTouchScreen = navigator?.msMaxTouchPoints > 0
        } else {
            //@ts-ignore
            const mQ = window.matchMedia && matchMedia("(pointer:coarse)")
            if (mQ && mQ.media === "(pointer:coarse)") {
                hasTouchScreen = !!mQ.matches;
            } else if ("orientation" in window) {
                hasTouchScreen = true // deprecated, but good fallback
            } else {
                // Only as a last resort, fall back to user agent sniffing
                const UA = navigator.userAgent
                hasTouchScreen =
                    /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
                    /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
            }
        }

        setIsMobile(hasTouchScreen)

    }, [])




    return isMobile
}

export default useIsMobile