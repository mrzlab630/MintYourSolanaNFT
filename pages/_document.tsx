/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-09-17
 * Time: 11:34
 * About:
 *
 */
import Document, { Html, Head, Main, NextScript } from 'next/document'
import {FacebookPixel, Gtag} from "../lib"
import GoogleTagManager from '@magicul/next-google-tag-manager'


class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    {
                        /* Analytics */
                        process.env.NODE_ENV === 'production' && <><Gtag/><FacebookPixel/></>
                    }
                </Head>
                <body className={`body cr-white bg-blue`}>
                    {
                          /* Install Google Tag Manager  */
                        process.env.NODE_ENV === 'production' && process.env.GOOGLE_ANALYTICS_TAG 
                        ? <GoogleTagManager id={process.env.GOOGLE_ANALYTICS_TAG} /> 
                        : null
                    }                
                <Main />
                <NextScript />
                </body>
            </Html>
        )
    }
}


export default MyDocument