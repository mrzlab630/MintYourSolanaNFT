/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-12-29
 * Time: 15:49
 * About:
 *
 */

import * as splToken from "@solana/spl-token"
import {createUninitializedAccount} from "./"
import {TOKEN_PROGRAM_ID} from "./constants"




const createTokenAccount =(
    instructions:any,
    payer:any,
    accountRentExempt:any,
    mint:any,
    owner:any,
    signers:any,
) => {
    const account = createUninitializedAccount(
        instructions,
        payer,
        accountRentExempt,
        signers,
    );
    instructions.push(
        splToken.Token.createInitAccountInstruction(TOKEN_PROGRAM_ID, mint, account, owner),
    );
    return account;
}


export default createTokenAccount