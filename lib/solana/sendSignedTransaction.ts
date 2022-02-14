/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-12-29
 * Time: 15:52
 * About:
 *
 */
import {DEFAULT_TIMEOUT} from "./constants"
import {awaitTransactionSignatureConfirmation} from "./index"
import {IsendSignedTransaction} from "./types/IsendSignedTransaction"

const sendSignedTransaction:IsendSignedTransaction = async function({
    signedTransaction,
    connection,
    timeout,
})
{
    try {

        timeout = timeout ?? DEFAULT_TIMEOUT

        const rawTransaction = signedTransaction.serialize();
        const txid = await connection.sendRawTransaction(
            rawTransaction,
            {
                skipPreflight: true,
            },
        );

        const {error:errConf, slot }  = await awaitTransactionSignatureConfirmation(
            {
                txid,
                timeout,
                connection,
                commitment:'recent',
                queryStatus:true,
            }
        )

        if(errConf){
            throw new Error(`Transaction failed: Custom instruction error. ${errConf}`)
        }

        if (!slot){
            throw new Error('Timed out awaiting confirmation on transaction');
        }


        return { txid, slot };


    }catch (e) {
        return {error: (e as any).message}
    }



}


export default sendSignedTransaction