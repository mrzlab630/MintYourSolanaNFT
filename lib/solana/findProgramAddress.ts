/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-12-29
 * Time: 15:48
 * About:
 *
 */
import {PublicKey} from "@solana/web3.js";

const findProgramAddress = async (
    seeds:any,
    programId:any,
) => {

    const result = await PublicKey.findProgramAddress(seeds, programId);
    return [result[0].toBase58(), result[1]];

};



export default findProgramAddress