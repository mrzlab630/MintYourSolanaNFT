/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-12-29
 * Time: 15:54
 * About:
 *
 */


import {PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY, TransactionInstruction} from "@solana/web3.js"
import CreateMetadataArgs from "./classes/CreateMetadataArgs"
import {programIds} from './constants'
import {findProgramAddress} from "./"
import {IcreateMetadata} from "./types/IcreateMetadata"
import {initBuffer} from './helpders'
import getTxnData from "./helpders/getTxnData"
import {Creator} from "./classes";

initBuffer()



const createMetadata:IcreateMetadata = async function({
        data,
        updateAuthority,
        mintKey,
        mintAuthorityKey,
        instructions,
        payer
    }) {
   try {
       const metadataProgramId = programIds.metadata;

       const metadataAccount = (
           await findProgramAddress(
               [
                   Buffer.from('metadata'),
                   new PublicKey(metadataProgramId).toBuffer(),
                   new PublicKey(mintKey).toBuffer(),
               ],
               new PublicKey(metadataProgramId),
           )
       )[0]


       const value = new CreateMetadataArgs({ data, isMutable: true})


       const {creators} = value?.data

       if(Array.isArray(creators)){
           value.data.creators = creators.map(itm => new Creator(itm))
       }


       let txnData = getTxnData(value)

       const keys = [
           {
               pubkey: new PublicKey(metadataAccount),
               isSigner: false,
               isWritable: true,
           },
           {
               pubkey: new PublicKey(mintKey),
               isSigner: false,
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
               pubkey: new PublicKey(updateAuthority),
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
               data: txnData,
           }),
       );


       return {result:metadataAccount};


   }catch (e) {
       return {error:(e as any).message}
   }
}


export default createMetadata