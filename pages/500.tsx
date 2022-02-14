/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-09-17
 * Time: 11:45
 * About:
 *
 */

import {IServerErrorPage} from '../interfaceAndType/IServerErrorPage'
import {NextPage} from "next"
import {useAppSelector} from "../redux/hooks"
import {RootState} from "../redux/store"
import SEOHead from "../components/SEOHead"
import ErrorPage from "../layouts/ErrorPage"


const ServerErrorPage: NextPage<IServerErrorPage> = () => {

    const header = useAppSelector((state:RootState) => state.seo.header)
    const seo = header.filter(itm => itm.page === 'error').pop()



    return <>
        <SEOHead
            {...seo}
            type={'website'}
            twitter={{
                ...header,
                card:'summary_large_image',
                image:seo?.image
            }}
        />
        <ErrorPage
            code={500}
            title={'Server error'}
            subText={`Unfortunately we're having trouble loading the page you are looking for. Please come back in a while.`}
        />
        </>
}

export default ServerErrorPage