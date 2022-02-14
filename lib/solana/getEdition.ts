/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-12-29
 * Time: 15:53
 * About:
 *
 */
import {PublicKey} from "@solana/web3.js"
import {findProgramAddress} from "./"
import {EDITION, METADATA_PREFIX, programIds} from "./constants"



const getEdition = async function(
    tokenMint:any,
){
    return (
        await findProgramAddress(
            [
                Buffer.from(METADATA_PREFIX),
                new PublicKey(programIds.metadata).toBuffer(),
                new PublicKey(tokenMint).toBuffer(),
                Buffer.from(EDITION),
            ],
            new PublicKey(programIds.metadata),
        )
    )[0];
}


export default getEdition