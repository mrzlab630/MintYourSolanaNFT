/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-10-27
 * Time: 13:15
 * About: https://mariestarck.com/add-google-analytics-to-your-next-js-application-in-5-easy-steps/
 *
 */
import {NextPage} from "next"


export interface IGtag{

}

export interface IgtagPageview{
    (url:string):void
}


export interface IgtagEvent{
    (v:{ action:string, params:{} }):void
}


// Global Site Tag (gtag.js) - Google Analytics
const Gtag:NextPage<IGtag> = () =>{

    const gtagId = process.env.GOOGLE_ANALYTICS_ID || ''


    return <>
        <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}
        />
        <script
            dangerouslySetInnerHTML={{
                __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtagId}', {
              page_path: window.location.pathname,
            });
          `,
            }}
        />
        </>
}


// log the pageview with their URL
const gtagPageview:IgtagPageview = (url) => {
    //@ts-ignore
    if(!window?.gtag){
        return
    }

    //@ts-ignore
    window.gtag('config', process.env.GOOGLE_ANALYTICS_ID, {
        page_path: url,
    })
}


// log specific events happening.
const gtagEvent:IgtagEvent = ({ action, params }) => {
    //@ts-ignore
    if(!window?.gtag){
        return
    }
    //@ts-ignore
    window.gtag('event', action, params)
}




export {
    Gtag,
    gtagPageview,
    gtagEvent
}