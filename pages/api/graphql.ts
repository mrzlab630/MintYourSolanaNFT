/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-10-11
 * Time: 17:43
 * About:
 *
 */
import { ApolloServer } from 'apollo-server-micro'
import schema from './graphql/schemas'
import Cors from 'micro-cors'
import {ApolloServerPluginLandingPageDisabled} from "apollo-server-core"


const cors = Cors(
    {
        exposeHeaders:['Authorization','x-key'],
        allowHeaders:['Authorization','x-key'],
        allowCredentials:true,
        allowMethods: ['GET','HEAD','PUT','PATCH','POST','DELETE'],
        origin:'*'
    }
)

const apolloServer = new ApolloServer({
    ...schema,
    plugins: [
        ApolloServerPluginLandingPageDisabled(),
    ],
})

const startServer = apolloServer.start()

export default cors(async function handler(req, res) {
    if (req.method === 'OPTIONS') {
        res.end()
        return false
    }
    await startServer

    await apolloServer.createHandler({
        path: '/api/graphql',
    })(req, res)
})

export const config = {
    api: {
        bodyParser: false,
    },
}