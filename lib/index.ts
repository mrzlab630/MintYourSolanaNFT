/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-10-27
 * Time: 13:18
 * About:
 *
 */

import {
    startAgentArweave,
    uploadDataToArweave,
    getDataFromArweave,
    metaplexAddData
} from  './arweave'

import {
    awaitTransactionSignatureConfirmation,
    createAssociatedTokenAccountInstruction,
    createMasterEdition,
    createMetadata,
    createMint,
    createTokenAccount,
    createUninitializedAccount,
    createUninitializedMint,
    findProgramAddress,
    getEdition,
    mintNFT,
    burnNFT,
    sendSignedTransaction,
    sendTransactionWithRetry,
    updateMetadata
} from './solana'


import {
    Gtag,
    gtagPageview,
    gtagEvent
} from './googleAnalytics'

import {
    FacebookPixel,
    fbPixelPageview
} from './facebookAnalytics'





export {
    Gtag,
    gtagPageview,
    gtagEvent,

    FacebookPixel,
    fbPixelPageview,

    startAgentArweave,
    uploadDataToArweave,
    getDataFromArweave,
    metaplexAddData,

    awaitTransactionSignatureConfirmation,
    createAssociatedTokenAccountInstruction,
    createMasterEdition,
    createMetadata,
    createMint,
    createTokenAccount,
    createUninitializedAccount,
    createUninitializedMint,
    findProgramAddress,
    getEdition,
    mintNFT,
    burnNFT,
    sendSignedTransaction,
    sendTransactionWithRetry,
    updateMetadata
}