/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-12-29
 * Time: 15:48
 * About:
 *
 */
import * as splToken from "@solana/spl-token"
import {createUninitializedMint} from "./"
import {TOKEN_PROGRAM_ID} from "./constants";



const createMint = function(
    instructions:any,
    payer:any,
    mintRentExempt:any,
    decimals:any,
    owner:any,
    freezeAuthority:any,
    signers:any,
) {
    const account = createUninitializedMint(
        instructions,
        payer,
        mintRentExempt,
        signers,
    );
    instructions.push(
        splToken.Token.createInitMintInstruction(
            TOKEN_PROGRAM_ID,
            account,
            decimals,
            owner,
            freezeAuthority,
        ),
    );
    return account;
}

export default createMint