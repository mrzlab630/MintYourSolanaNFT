/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-12-29
 * Time: 15:52
 * About:
 *
 */
import {IawaitTransactionSignatureConfirmation} from './types/IawaitTransactionSignatureConfirmation'
import {sleepUtil} from './helpders'


const awaitTransactionSignatureConfirmation:IawaitTransactionSignatureConfirmation = async function ({
                                                                                                         txid,
                                                                                                         timeout,
                                                                                                         connection,
                                                                                                         commitment,
                                                                                                         queryStatus,
                                                                                                     }){
    try{

        commitment = commitment ?? 'recent'
        let done = false

        let status = {
            slot: 0,
            confirmations: 0,
            err: null,
        }
        let subId = 0


        status = await new Promise(async (resolve, reject) => {
            setTimeout(() => {
                if (done) {
                    return;
                }
                done = true;
                console.log('Rejecting for timeout...');
                reject({ timeout: true });
            }, timeout);
            try {
                subId = connection.onSignature(
                    txid,
                    (result:any, context:any) => {
                        done = true;
                        status = {
                            err: result.err,
                            slot: context.slot,
                            confirmations: 0,
                        };
                        if (result.err) {
                            console.log('Rejected via websocket', result.err);
                            reject(status);
                        } else {
                            console.log('Resolved via websocket', result);
                            resolve(status);
                        }
                    },
                    commitment,
                );
            } catch (e) {
                done = true;
                console.error('WS error in setup', txid, e);
            }
            while (!done && queryStatus) {
                // eslint-disable-next-line no-loop-func
                await (async () => {
                    try {
                        const signatureStatuses = await connection.getSignatureStatuses([txid])
                        status = signatureStatuses && signatureStatuses.value[0];
                        if (!done) {
                            if (!status) {
                                console.log('REST null result for', txid, status);
                            } else if (status.err) {
                                console.log('REST error for', txid, status);
                                done = true;
                                reject(status.err);
                            } else if (!status.confirmations) {
                                console.log('REST no confirmations for', txid, status);
                            } else {
                                console.log('REST confirmation for', txid, status);
                                done = true;
                                resolve(status);
                            }
                        }
                    } catch (e) {
                        if (!done) {
                            console.log('REST connection error: txid', txid, e);
                        }
                    }
                })();
                await sleepUtil(1000);
            }
        });


        //@ts-ignore
        if (connection._signatureSubscriptions[subId])
            connection.removeSignatureListener(subId);
        done = true;


        const {err,slot,confirmations} = status


        if(err){
            throw new Error(err)
        }

        return {slot,confirmations}

    }catch (e) {
        return {error:(e as any).message}
    }
}




export default awaitTransactionSignatureConfirmation