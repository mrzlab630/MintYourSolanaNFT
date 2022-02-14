/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-10-28
 * Time: 16:59
 * About:
 *
 */
import {NextPage} from "next"


export interface IFacebookPixel {

}

const FacebookPixel:NextPage<IFacebookPixel> = () =>{

    const pixelId = process.env.FACEBOOK_PIXEL_ID || ''


    return <>
        <script
            dangerouslySetInnerHTML={{
                __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
            fbq('track', 'PageView');
          `
            }}
        />
        <noscript
            dangerouslySetInnerHTML={{
                __html:`
                <img
                alt=''
                class="facebookPixelImg"
                src='https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1'
            />
            `
            }}
        />
        </>
}


// log the pageview
//@ts-ignore
const fbPixelPageview = () =>  window?.fbq('track', 'PageView')



export {
    FacebookPixel,
    fbPixelPageview
}