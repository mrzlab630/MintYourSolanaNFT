/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-10-12
 * Time: 10:28
 * About:
 *
 */
import {gql} from "apollo-server-micro"
import {
    typeDefaultResult
} from '../types/defaultTypes'

import {typeFeedback} from '../schemas/feedback'
import {typeEcho} from '../schemas/echo'





const typeDefs = gql`
        ${typeDefaultResult}
 
   type Query {
       ${typeEcho}
   }
  type Mutation {   
    ${typeFeedback}
  }
`


export default typeDefs