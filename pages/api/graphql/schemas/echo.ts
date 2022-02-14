/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-11-16
 * Time: 14:59
 * About:
 *
 */
import {TContext} from "../context"
import {UserInputError} from "apollo-server-micro";




export interface IresolveEchoArgs{
    echo?: string
}

export interface IresolveEchoResult {
    [index: string]: any
}

export interface IresolveEcho{
    (
        _parent:void,
        args:IresolveEchoArgs,
        ctx:TContext
    ):Promise<IresolveEchoResult>
}



const resolveEcho:IresolveEcho = async (_parent, args, ctx) =>{
    try {
        const {xKey,ip, userAgent} = ctx || false

        if(!xKey){
            throw new Error('xKey')
        }

        const {echo} = args || false


        return {result:`echo! ${echo}`}


    }catch (e){
            throw new UserInputError((e as Error).message,{
                invalidArgs: Object.keys(args),
            })
        }
}





const typeEcho = `echo(echo: String): DefaultResult!`


export {
    resolveEcho,
    typeEcho
}