/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-10-11
 * Time: 17:45
 * About:
 *
 */

import typeDefs from '../types'
import resolvers from '../resolvers'
import createContext from '../context'


const schema = {
    typeDefs,
    resolvers,
    context: createContext
}



export default schema