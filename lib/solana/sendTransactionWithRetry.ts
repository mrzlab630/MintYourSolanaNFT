/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-12-29
 * Time: 15:51
 * About:
 *
 */
import {Transaction} from "@solana/web3.js"
import {sendSignedTransaction} from  './'
import {IsendTransactionWithRetry} from "./types/IsendTransactionWithRetry"


const sendTransactionWithRetry:IsendTransactionWithRetry = async (
    {
        connection,
        wallet,
        instructions,
        signers,
        commitment,
        includesFeePayer,
        block,
        beforeSend,
    }
) => {

try{

    commitment = commitment ??  'singleGossip'

    let transaction = new Transaction()

    instructions.forEach((instruction:any) => transaction.add(instruction))

    transaction.recentBlockhash = (
        block || (await connection.getRecentBlockhash(commitment))
    ).blockhash

    if (includesFeePayer) {
        transaction.setSigners(...signers.map((s:any) => s.publicKey));
    } else {
        transaction.setSigners(
            // fee payed by the wallet owner
            wallet.publicKey,
            ...signers.map((s:any) => s.publicKey),
        )
    }
    if (signers.length > 0) {
        transaction.partialSign(...signers);
    }
    if (!includesFeePayer) {
        transaction = await wallet.signTransaction(transaction);
    }
    if (beforeSend) {
        beforeSend()
    }

    const { error, txid, slot } = await sendSignedTransaction({
        connection,
        signedTransaction: transaction,
    })


    if(error){
        throw new Error(error)
    }

    return { txid, slot }




}catch (e){
    return {error:(e as any).message}
}
}


export default sendTransactionWithRetry