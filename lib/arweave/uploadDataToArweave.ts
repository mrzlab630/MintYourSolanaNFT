/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2022-01-05
 * Time: 11:22
 * About:
 *
 */

import {IuploadFileToArweave} from "./types/IuploadFileToArweave"
import awaitTransactionConfirmation from "./awaitTransactionConfirmation"
import startAgentArweave from "./startAgentArweave"
import loggingInfo from "../../utils/loggingInfo"


const readFile = (file:File):Promise<string | ArrayBuffer | null> => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsArrayBuffer(file)
    })





const uploadDataToArweave:IuploadFileToArweave = async function ({
                                                                     walletKey,
                                                                     data,
                                                                     type,
                                                                     tags,
                                                                     logging,
                                                                     timeout
}){
    try {

        const host = 'arweave.net'

        loggingInfo({
            str:'Starting to upload data to Arweave',
            callback:logging
        })


        const {agent:arweave, error} = startAgentArweave({timeout})

        if(error || !arweave){
            throw new Error(error || `can't start arweave agent`)
        }

        const key = wallet //  await arweave.wallets.generate()

        const address = await arweave.wallets.jwkToAddress(key)

        const balanceWinston = await arweave.wallets.getBalance(address)

        const balance = balanceWinston ? Number(arweave.ar.winstonToAr(balanceWinston)) : 0

        const fileBuffer = typeof data === "string" ? Buffer.from(data, 'utf8') : await readFile(data)

        if(!fileBuffer){
            throw new Error(`can't read data`)
        }


        let transactionA = await arweave.createTransaction({ data:fileBuffer }, key)

        transactionA.addTag('Content-Type', type || data?.type || 'binary')
        // transactionA.addTag('Bundle-Format', type || data?.type || 'binary)
        // transactionA.addTag('Bundle-Version', '2.0.0')


        if(tags){
            // @ts-ignore
            Object.keys(tags).forEach((itm:string) => transactionA.addTag(itm, tags[itm]))
        }

       const priceWinstonTransaction = await arweave.transactions.getPrice(Number(transactionA.data_size)) // targetAddress?: string
       const priceTransaction = priceWinstonTransaction ? Number(arweave.ar.winstonToAr(priceWinstonTransaction)) : 0

        loggingInfo({
          //  str:`Transaction price: ${priceTransaction}AR / Wallet balance: ${balance}AR`,
            str:`Transaction price: ${priceTransaction}AR`,
            callback:logging
        })


        if(balance < priceTransaction){
            throw  new Error(`insufficient funds on the balance. you need to top up your wallet balance by about ${priceTransaction * 2}AR`)
        }

        await arweave.transactions.sign(transactionA, key)

        const uploader = await arweave.transactions.getUploader(transactionA)

        while (!uploader.isComplete) {
            await uploader.uploadChunk();


            loggingInfo({
                str:`uploading process: ${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`,
                callback:logging
            })
        }


        const {id:transactionId} = transactionA

        loggingInfo({
            str:`Transaction id: ${transactionId}`,
            callback:logging
        })


        const {
            error:statusTransactionErr,
            confirmed:statusTransaction
        } = await awaitTransactionConfirmation({
            arweave,
            transactionId,
            logging
        })

        if(statusTransactionErr){
            throw new Error(statusTransactionErr)
        }


        loggingInfo({
            str:`Data upload completed successfully`,
            callback:logging
        })

        const baseUrl = `https://${host}/tx/${transactionId}`

        const links ={
            tx:baseUrl,
            viewblock:`https://viewblock.io/arweave/address/${transactionId}`,
            uri:`https://${host}/${transactionId}`
        }

        return {
            links,
            transactionId
        }

    }catch (e) {
        return {error:(e as any).message}
    }
}


export default uploadDataToArweave