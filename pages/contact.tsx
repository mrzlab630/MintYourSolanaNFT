/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-10-21
 * Time: 15:34
 * About:
 *
 */
import {IContactPage} from '../interfaceAndType/IContactPage'
import {NextPage} from "next"
import {useAppSelector} from "../redux/hooks"
import {RootState} from "../redux/store"
import SEOHead from "../components/SEOHead"
import ContactPage from "../layouts/ContactPage"


const Contact: NextPage<IContactPage> = () => {

    const header = useAppSelector((state:RootState) => state.seo.header)
    const seo = header.filter(itm => itm.page === 'contact').pop()





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
            <ContactPage/>
        </>
}

export default Contact