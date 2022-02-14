/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-09-02
 * Time: 18:10
 * About:
 *
 */
import {ISEOHead} from './interface'
import Head from 'next/head'
import {NextPage} from "next"


const SEOHead: NextPage<ISEOHead> = ({
                                   type,
                                   title,
                                   description,
                                   url,
                                   image,
                                   siteName,
                                   twitter,
                                   children
}) => {

    return <Head>
        <meta charSet="utf-8"/>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0"/>
        <title>{title}</title>
        <meta property="og:locale" content="en_GB" />
        <meta
            content={title}
            property="og:title"
            key="ogtitle"
        />
         <meta content={image} property="og:image" key="ogimage" />
         <meta content={'800'} property="og:image:width"  />
         <meta content={'600'} property="og:image:height"  />
         <meta content={title} property="og:image:alt"  />

        {
            url && <meta property="og:url" content={url} key="ogurl" />
        }
        {
            siteName && <meta property="og:site_name" content={siteName} key="ogsitename" />
        }
        <meta
            content={description}
            name="description"
        />
        <meta
            content={description}
            property="og:description"
            key="ogdesc"
        />
         <meta property="og:type" content={type || 'website'} />
        {
            twitter?.title && <meta
                                    content={twitter?.title}
                                    property="twitter:title"
                                />
        }
        {
            twitter?.description &&  <meta
                                            content={twitter?.description}
                                            property="twitter:description"
                                        />
        }
        {
            twitter?.image && <meta content={twitter?.image} property="twitter:image" />
        }
        {
            twitter?.card && <meta name="twitter:card" content={twitter?.card} key="twcard" />
        }
        {children}
    </Head>
}

export default SEOHead