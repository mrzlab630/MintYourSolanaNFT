/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-10-11
 * Time: 17:45
 * About:
 *
 */

import {IResolvers} from "@graphql-tools/utils"
import {resolveFeedback} from '../schemas/feedback'
import {resolveEcho} from '../schemas/echo'


const resolvers: IResolvers = {
    Query: {
        echo:resolveEcho
    },
    Mutation:{
        feedback:resolveFeedback
    }
}

export default resolvers