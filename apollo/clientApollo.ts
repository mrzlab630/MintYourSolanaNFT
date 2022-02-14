/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-10-14
 * Time: 12:16
 * About:
 *
 */

import {
    ApolloClient,
    createHttpLink,
    InMemoryCache
} from "@apollo/client"
import { setContext } from '@apollo/client/link/context'
import {encrypt} from "../utils"


const authLink = setContext((_, { headers }) => {
    const token = encrypt({str:String(Date.now()), secretKey:String(Date.now())})
    return {
        headers: {
            ...headers,
            ['x-key']: encrypt({str:token, secretKey:String(Date.now())}),
            authorization: token ? `Bearer ${token}` : "",
        }
    }
})

const baseUrl = process.env.NODE_ENV === 'production' ? process.env.API_URL_PROD : process.env.API_URL_DEV


const httpLink = createHttpLink({
    uri: baseUrl,
    credentials: 'same-origin'
});



const clientApollo = new ApolloClient({
    ssrMode: typeof window === 'undefined',
    credentials: 'include',
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)

});


export default clientApollo