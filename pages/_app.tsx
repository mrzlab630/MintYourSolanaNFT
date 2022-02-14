/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-09-17
 * Time: 11:35
 * About:
 *
 */
import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import Router from "next/router"
import {useState,useEffect} from 'react'
import {Provider} from "react-redux"
import {store} from "../redux/store"
import ProgressBar from "../components/ProgressBar/ProgressBar"
import {gtagPageview, fbPixelPageview} from '../lib'
import { ApolloProvider } from "@apollo/client"
import {clientApollo} from '../apollo'


function MyApp({ Component, pageProps }: AppProps) {

    const [loading, setLoading] = useState(false)

    const {events:routerEvents} = useRouter()


    /* Analytics */
    useEffect(() => {

        if( process.env.NODE_ENV !== 'production'){
            return
        }

        const handleRouteChange = (url:string) => {
            gtagPageview(url)
            fbPixelPageview()
        }
        routerEvents.on('routeChangeComplete', handleRouteChange)

        return () =>  routerEvents.off('routeChangeComplete', handleRouteChange)
    }, [routerEvents])


    useEffect(() => {
        const start = () => setLoading(true)
        const end = () => setLoading(false)

        Router.events.on("routeChangeStart", start)
        Router.events.on("routeChangeComplete", end)
        Router.events.on("routeChangeError", end)

        return () => {
            Router.events.off("routeChangeStart", start)
            Router.events.off("routeChangeComplete", end)
            Router.events.off("routeChangeError", end)
        };
    }, [])






    return <Provider store={store}>
        <ApolloProvider client={clientApollo}>
                {
                    loading ? <ProgressBar/>
                        : <Component {...pageProps} />
                }
        </ApolloProvider>
            </Provider>

}

export default MyApp