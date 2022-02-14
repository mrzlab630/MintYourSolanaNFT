/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-12-29
 * Time: 15:55
 * About:
 *
 */
import {PublicKey, TransactionInstruction} from "@solana/web3.js"
import {serialize} from "borsh"
import {programIds} from './constants'
import {findProgramAddress} from "./"
import {UpdateMetadataArgs} from "./classes"
import getTxnData from "./helpders/getTxnData";




const updateMetadata = async function(
    data:any,
    newUpdateAuthority:any,
    primarySaleHappened:any,
    mintKey:any,
    updateAuthority:any,
    instructions:any,
    metadataAccount:any,
) {
    const metadataProgramId = programIds.metadata;
    metadataAccount =
        metadataAccount ||
        (
            await findProgramAddress(
                [
                    Buffer.from('metadata'),
                    new PublicKey(metadataProgramId).toBuffer(),
                    new PublicKey(mintKey).toBuffer(),
                ],
                new PublicKey(metadataProgramId),
            )
        )[0];

    const value = new UpdateMetadataArgs({
        data,
        updateAuthority: !newUpdateAuthority ? undefined : newUpdateAuthority,
        primarySaleHappened:
            primarySaleHappened === null || primarySaleHappened === undefined
                ? null
                : primarySaleHappened,
    });

    console.log('updateMetadata',{value})

    const txnData = getTxnData(value)//Buffer.from(serialize(METADATA_SCHEMA, value));
    const keys = [
        {
            pubkey: new PublicKey(metadataAccount),
            isSigner: false,
            isWritable: true,
        },
        {
            pubkey: new PublicKey(updateAuthority),
            isSigner: true,
            isWritable: false,
        },
    ];
    instructions.push(
        new TransactionInstruction({
            keys,
            programId: new PublicKey(metadataProgramId),
            data: txnData,
        }),
    );
    return metadataAccount;
}


export default updateMetadata