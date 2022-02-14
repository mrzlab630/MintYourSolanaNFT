/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-10-22
 * Time: 12:09
 * About:
 *
 */
import {UserInputError} from "apollo-server-micro"
import {TContext} from "../context"
import {sendMessageAction,tegramBotInit} from '../../../../telegram'


export interface IresolveFeedbackResult {
    [index: string]: any
}

export interface IresolveFeedbackArgs{
    name?: string,
    email?: string,
    message: string,
}

export interface IresolveFeedback {
    (
        _parent:void,
        args:IresolveFeedbackArgs,
        ctx:TContext
    ):Promise<IresolveFeedbackResult>
}


const resolveFeedback:IresolveFeedback = async (_parent, args, ctx) =>{
    try {
        const {xKey,ip, userAgent} = ctx || false

        if(!xKey){
            throw new Error('xKey is empty')
        }

        const {name,email,message} = args || false

        const tlgRes = process.env.TLG_BOT_RECIPIENT_ID || ''


        const res = await sendMessageAction(
            tegramBotInit({polling: false}),
            tlgRes,
            `from MintYourSolanaNFT.com\n\nIP-->${ip}\n\n${userAgent}\n\nemail: ${email} || name: ${name}\n\nmessage: ${message}`,
            false
        )

        const {error:errorSend} = res || false

        if(errorSend){
            throw new Error(`can't send your message`)
        }




        return {result:'the message has been sent'}


    }catch (e){
        throw new UserInputError((e as Error).message,{
            invalidArgs: Object.keys(args),
        })
    }

}













const typeFeedback = `feedback(
                                name: String,
                                email: String,
                                message: String,
                                ): DefaultResult!`


export {
    resolveFeedback,
    typeFeedback
}