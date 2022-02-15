/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2022-01-05
 * Time: 15:59
 * About:
 *
 */
import {
    IawaitTransactionConfirmation,
    IawaitTransactionConfirmationStatus
} from "./types/IawaitTransactionConfirmation"
import {sleepUtil} from "../solana/helpders"
import loggingInfo from "../../utils/loggingInfo";




const awaitTransactionConfirmation:IawaitTransactionConfirmation = async function ({
                                                                                       arweave,
                                                                                       transactionId,
                                                                                       timeout,
                                                                                       logging
}){

     timeout = timeout || 99999999

    loggingInfo({
        str:`Transaction verification. Please wait`,
        callback:logging
    })

    const transactionStatus:IawaitTransactionConfirmationStatus = {
        code:0,
        done:false,
        info:undefined,
        error: undefined,
        logging: undefined,
    }


    setTimeout(() => {

        if (transactionStatus?.done) {
            return transactionStatus
        }
        transactionStatus.done = true
        return({ error: 'Rejecting for timeout' })
    }, timeout)



    try{

        await sleepUtil(180000)

        while (!transactionStatus?.done ) {

            const getStatus = await arweave.transactions.getStatus(transactionId)


            switch (getStatus?.status || 500) {

                case 202:
                    //Pending


                    transactionStatus.logging = `Pending...`
                    transactionStatus.done = false
                    transactionStatus.info = getStatus
                    break

                case 200:
                    //Done

                    transactionStatus.logging =`Transaction confirmed successful`
                    transactionStatus.done = true
                    transactionStatus.info = getStatus
                    break

                case 404:
                    //Ooops!

                    if(transactionStatus.code === 404){
                        transactionStatus.logging =`Ooops! Transaction not found`
                        transactionStatus.done = true
                        transactionStatus.error = 'transaction not found'
                    }else{
                        transactionStatus.logging =`Pending..`
                        transactionStatus.done = false
                        await sleepUtil(180000)
                    }
                    break

                default:
                    transactionStatus.done = true
                    transactionStatus.error = getStatus
                    break
            }


            loggingInfo({
                str:transactionStatus?.logging ?? '',
                callback:logging
            })

            transactionStatus.code = getStatus.status


            if(transactionStatus.code !== 200){
                await sleepUtil(28000)
            }
        }


        const {error,info} = transactionStatus

        if(error){
            throw new Error(error)
        }

        const {confirmed} = info

        return {confirmed}

    }catch (e) {
        transactionStatus.done = true
        transactionStatus.error = (e as any).message

        return {error:(e as any).message}
    }

}


export default awaitTransactionConfirmation