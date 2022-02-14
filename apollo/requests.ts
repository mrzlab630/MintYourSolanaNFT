/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-10-14
 * Time: 12:19
 * About:
 *
 */
import gql from "graphql-tag"


// Mutation

const feedback = gql`mutation Feedback(
                                $name: String,
                                $email: String,
                                $message: String,
                                )
                                {
                                feedback(
                                name: $name,
                                email: $email,
                                message: $message,
                                )
                                {
                                result
                                } 
                                }
`




export {
    feedback,
}