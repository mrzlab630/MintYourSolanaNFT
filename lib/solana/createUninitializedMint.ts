/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-12-29
 * Time: 15:49
 * About:
 *
 */
import {Keypair, SystemProgram} from "@solana/web3.js"
import * as splToken from "@solana/spl-token"
import {TOKEN_PROGRAM_ID} from "./constants"


const createUninitializedMint = function(
    instructions:any,
    payer:any,
    amount:any,
    signers:any,
) {
    const account = Keypair.generate();
    instructions.push(
        SystemProgram.createAccount({
            fromPubkey: payer,
            newAccountPubkey: account.publicKey,
            lamports: amount,
            space: splToken.MintLayout.span,
            programId: TOKEN_PROGRAM_ID,
        }),
    );
    signers.push(account);
    return account.publicKey;
}



export default createUninitializedMint