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
                <Main />
                <NextScript />
                </body>
            </Html>
        )
    }
}


export default MyDocument