/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-12-29
 * Time: 15:45
 * About:
 *
 */
import * as splToken from "@solana/spl-token"
import {clusterApiUrl, Connection, PublicKey} from "@solana/web3.js"
import {
    createAssociatedTokenAccountInstruction, createMasterEdition,
    createMetadata,
    createMint,
    findProgramAddress,
    sendTransactionWithRetry
} from './'
import {programIds,TOKEN_PROGRAM_ID} from "./constants"
import {Data} from "./classes"
import {ImintNFT} from "./types/ImintNFT"
import BN from 'bn.js'


// (window as any).global = window
// window.Buffer = window.Buffer || require('buffer').Buffer






const mintNFT:ImintNFT = async function ({
                                             cluster,
                                             wallet,
                                             metadata
                                         }){
    try{
        //there is a problem with the mainnet-beta(https://api.mainnet-beta.solana.com): has been blocked by CORS policy
        const NETWORK = cluster === 'mainnet-beta' ? 'https://solana-api.projectserum.com' : clusterApiUrl(cluster)
        const connection = new Connection(NETWORK,'confirmed')


        // Allocate memory for the account
        const mintRent = await connection.getMinimumBalanceForRentExemption(splToken.MintLayout.span)


        const payerPublicKey = wallet.publicKey

        const instructions:any[] = []
        const signers:any[] = []


        // This is only temporarily owned by wallet...transferred to program by createMasterEdition below
        const mintKey = createMint(
            instructions,
            payerPublicKey,
            mintRent,
            0,
            // Some weird bug with phantom where it's public key doesnt mesh with data encode wellff
            new PublicKey(payerPublicKey),
            new PublicKey(payerPublicKey),
            signers,
        ).toBase58()

        const recipientKey = (

            await findProgramAddress(
                [
                    payerPublicKey.toBuffer(),// wallet.publicKey.toBuffer(),
                    programIds.token.toBuffer(),
                    new PublicKey(mintKey).toBuffer(),
                ],
                programIds.associatedToken,
            )

        )[0]

        createAssociatedTokenAccountInstruction(
            instructions,
            new PublicKey(recipientKey),
            payerPublicKey,
            payerPublicKey,
            new PublicKey(mintKey),
        );


        const classData = new Data(metadata)

        const {error:mtErr, result:metadataAccount} = await createMetadata({
            data:classData,
            updateAuthority:payerPublicKey,
            mintKey,
            mintAuthorityKey:payerPublicKey,
            instructions,
            payer:  payerPublicKey.toBase58()
        })


        if(mtErr){
            throw new Error(mtErr)
        }


        const { txid, error: sendTransactionWithRetryErr} = await sendTransactionWithRetry({
                connection,
                wallet,
                instructions,
                signers,
                commitment:'singleGossip',
            } )

        if(sendTransactionWithRetryErr){
            throw new Error(sendTransactionWithRetryErr)
        }

        if(!txid){
            throw new Error('Error: send transaction timeout')
        }

        await connection.confirmTransaction(txid, 'max')

        await connection.getParsedConfirmedTransaction(txid, 'confirmed')


        //Mint 1 Token

        const updateInstructions = []

        updateInstructions.push(
            splToken.Token.createMintToInstruction(
                TOKEN_PROGRAM_ID,
                new PublicKey(mintKey),
                new PublicKey(recipientKey),
                new PublicKey(payerPublicKey),
                [],
                1,
            ),
        );

        await createMasterEdition(
            new BN(1),
            mintKey,
            payerPublicKey,
            payerPublicKey,
            payerPublicKey,
            updateInstructions,
        )


        await sendTransactionWithRetry({
            connection,
            wallet,
            instructions:updateInstructions,
            signers:[]
        } )


        const result = {
            metadataAccount,
            mintKey,
            account: recipientKey
        }

        return {result}

    }catch (e) {
        return {error:(e as any).message}
    }
}



export default mintNFT

