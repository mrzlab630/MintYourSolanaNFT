/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-12-29
 * Time: 15:47
 * About:
 *
 */
import {PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY, TransactionInstruction} from "@solana/web3.js";
import {serialize} from "borsh";
import {EDITION, METADATA_PREFIX, programIds} from "./constants";
import {findProgramAddress} from "./index";
import {CreateMasterEditionArgs, Creator, Data} from "./classes";
import getTxnData from "./helpders/getTxnData";




async function createMasterEdition(
    maxSupply:any,
    mintKey:any,
    updateAuthorityKey:any,
    mintAuthorityKey:any,
    payer:any,
    instructions:any,
) {
    const metadataProgramId = programIds.metadata;
    const metadataAccount = (
        await findProgramAddress(
            [
                Buffer.from(METADATA_PREFIX),
                new PublicKey(metadataProgramId).toBuffer(),
                new PublicKey(mintKey).toBuffer(),
            ],
            new PublicKey(metadataProgramId),
        )
    )[0];
    const editionAccount = (
        await findProgramAddress(
            [
                Buffer.from(METADATA_PREFIX),
                new PublicKey(metadataProgramId).toBuffer(),
                new PublicKey(mintKey).toBuffer(),
                Buffer.from(EDITION),
            ],
            new PublicKey(metadataProgramId),
        )
    )[0];
    const value = new CreateMasterEditionArgs({ maxSupply: maxSupply || null })


    const data = getTxnData(value)
    const keys = [
        {
            pubkey: new PublicKey(editionAccount),
            isSigner: false,
            isWritable: true,
        },
        {
            pubkey: new PublicKey(mintKey),
            isSigner: false,
            isWritable: true,
        },
        {
            pubkey: new PublicKey(updateAuthorityKey),
            isSigner: true,
            isWritable: false,
        },
        {
            pubkey: new PublicKey(mintAuthorityKey),
            isSigner: true,
            isWritable: false,
        },
        {
            pubkey: new PublicKey(payer),
            isSigner: true,
            isWritable: false,
        },
        {
            pubkey: new PublicKey(metadataAccount),
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: programIds.token,
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: SystemProgram.programId,
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
            programId: new PublicKey(metadataProgramId),
            data,
        }),
    );
}


export default createMasterEdition