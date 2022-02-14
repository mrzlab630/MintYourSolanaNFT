/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-09-17
 * Time: 11:45
 * About:
 *
 */

import {IPageNotFound} from '../interfaceAndType/IPageNotFound'
import {NextPage} from "next"
import {useAppSelector} from "../redux/hooks"
import {RootState} from "../redux/store"
import SEOHead from "../components/SEOHead"
import ErrorPage from "../layouts/ErrorPage"


const PageNotFound: NextPage<IPageNotFound> = () => {

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
            code={404}
            title={'Page not found'}
            subText={'Looks like the page you were looking for is no longer here.'}
        />
        </>
}

export default PageNotFound