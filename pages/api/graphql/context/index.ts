/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-10-12
 * Time: 10:55
 * About:
 *
 */

import { NextApiRequest,NextApiResponse } from 'next'

export type TContext = {
    xKey?:string,
    ip?:string,
    userAgent?:string
}

export interface IcreateContextParams {
    req:NextApiRequest,
    res:NextApiResponse
}
export interface IcreateContext {
    (p:IcreateContextParams): Promise<TContext>
}




const createContext:IcreateContext = async function ({ req, res }) {


    //@ts-ignore
    const ip = req ? String(req.headers["x-forwarded-for"] || '' ).split(",").pop() || req.connection.remoteAddress || req.socket.remoteAddress ||  req.connection.socket.remoteAddress : null
    const userAgent = String(req.headers['user-agent'])
    const xKey = String(req.headers["x-key"])



    return {
        ip,
        userAgent,
        xKey
    }
}


export default createContext
