/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-12-29
 * Time: 15:50
 * About:
 *
 */
import {SystemProgram, SYSVAR_RENT_PUBKEY, TransactionInstruction} from "@solana/web3.js";
import {programIds} from "./constants";


const createAssociatedTokenAccountInstruction = function(
    instructions:any,
    associatedTokenAddress:any,
    payer:any,
    walletAddress:any,
    splTokenMintAddress:any,
) {
    const keys = [
        {
            pubkey: payer,
            isSigner: true,
            isWritable: true,
        },
        {
            pubkey: associatedTokenAddress,
            isSigner: false,
            isWritable: true,
        },
        {
            pubkey: walletAddress,
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: splTokenMintAddress,
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: SystemProgram.programId,
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: programIds.token,
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: SYSVAR_RENT_PUBKEY,
            isSigner: false,
            isWritable: false,
        },
    ];
    instructions.push(
        new TransactionInstruction({
            keys,
            programId: programIds.associatedToken,
            data: Buffer.from([]),
        }),
    );
}


export default createAssociatedTokenAccountInstruction