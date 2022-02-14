/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-10-22
 * Time: 12:23
 * About:
 *
 */

const sendMessageAction = async function (BotInit:any,chatId:string,message:string,menuDop:any) {
    try {

        if(!BotInit){
            throw new Error(`BotInit emty`)
        }
        if(!chatId){
            throw new Error('chatId emty')
        }
        if(!message){
            throw new Error('message emty')
        }


        return  await  BotInit.sendMessage(chatId, message,{
            reply_markup:{
                ...menuDop,
            },
            parse_mode:'HTML'
        })


    }catch (e) {
        return {
            error:(e as Error).message
        }
    }
}


export default sendMessageAction