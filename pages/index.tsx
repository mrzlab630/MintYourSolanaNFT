/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-09-17
 * Time: 11:33
 * About:
 *
 */

import {GetServerSideProps, NextPage} from "next"
import {IHomePage} from '../interfaceAndType/IHomePage'
import {useAppSelector} from "../redux/hooks"
import {RootState} from "../redux/store"
import HomePage from "../layouts/HomePage"
import SEOHead from "../components/SEOHead"
import { InfoInConsole} from "../utils"
import {useEffect} from "react"
import {initialStateSettings} from "../redux/initialState"



const Home: NextPage<IHomePage> = ({
                                       title,
                                       info
}) => {


    const header = useAppSelector((state:RootState) => state.seo.header)
    const seo = header.filter(itm => itm.page === 'root').pop()

    useEffect(() => InfoInConsole(),[])



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
        <HomePage
            {...{title,info}}
        />
    </>
}


export default Home



export const getServerSideProps:GetServerSideProps = async (context) => {

    const {transactionPrice} = initialStateSettings
    const {arweave,solana} = transactionPrice


    const host = process.env.NODE_ENV === "development" ? process.env.BASE_URL_DEV : process.env.BASE_URL_PROD

    const url = `${host}/static/pages/home.json`

    const getData = await fetch(url)
    const {title,info} = await getData?.json()



    const props = {
        title,
        info:info.replace('{%%transactionPriceArweave%%}',arweave*2).replace('{%%transactionPriceSolana%%}',solana)
    }

    return {props}
}
