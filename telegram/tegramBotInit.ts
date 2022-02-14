/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-10-22
 * Time: 12:23
 * About:
 *
 */

//import Agent from 'socks5-https-client/lib/Agent'
import TelegramBotApi from 'node-telegram-bot-api'



const tegramBotInit = (options:any) =>{
    try {

        const token = process.env.TLG_BOT_TOKEN

        if(!token){
            throw new Error('telegram token is empty')
        }


        // const botOptions = {
        //     polling: true,
        //     request: {
        //         agentClass: Agent,
        //         agentOptions: {
        //             socksHost: '127.0.0.1',
        //             socksPort: '9050'
        //         }
        //     }
        // }


        const bot = new TelegramBotApi(token, options)

        return bot

    }catch (e) {
        return {
            error:(e as Error).message
        }
    }



}

export default tegramBotInit