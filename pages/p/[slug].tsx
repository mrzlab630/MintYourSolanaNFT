/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-11-16
 * Time: 10:57
 * About:
 *
 */
import {GetServerSideProps, NextPage} from "next"
import { useRouter } from 'next/router'
import {IGetPage} from '../../interfaceAndType/IGetPage'
import {useAppSelector} from "../../redux/hooks"
import {RootState} from "../../redux/store"
import SEOHead from "../../components/SEOHead"
import PageWrap from "../../layouts/PageWrap"
import {decryptBase64} from "../../utils"
import {useEffect} from "react"




const GetPage: NextPage<IGetPage> = ({
                                   content,
                                   title,
                                   description,
                                   redirect
}) => {

    const router = useRouter()

    const header = useAppSelector((state:RootState) => state.seo.header)
    const seo = header.filter(itm => itm.page === 'root').pop()


    useEffect(() =>{
        if(redirect){
            router.push('/404')
        }
    },[redirect])



    return <>
        <SEOHead
            {...{...seo,title,description}}
            type={'website'}
            twitter={{
                ...header,
                card:'summary_large_image',
                image:seo?.image
            }}
        />
        <PageWrap>
            <div
                className={'content'}
                dangerouslySetInnerHTML={{__html: content || ''}}
            />
        </PageWrap>

    </>
}

export default GetPage


export const getServerSideProps:GetServerSideProps = async (context) => {

    const {query,res} = context || false
    const {slug} = query || false

    const host = process.env.NODE_ENV === "development" ? process.env.BASE_URL_DEV : process.env.BASE_URL_PROD



    let props:IGetPage = {
        content:'',
        title:'',
        description:'',
        redirect:false
    }

    switch (String(slug)) {
        case 'privacy':

            const getData = await fetch(`${host}/static/pages/privacy.json`)
            const jsonData = await getData?.json()

            props = {
                ...jsonData,
                redirect:false
            }

            break

        default:
            res.statusCode = 404
            props.redirect = true
    }

    props.content = props.content ? decryptBase64(props.content) : ''


    return {props}
}