/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-12-29
 * Time: 15:56
 * About:
 *
 */
import {clusterApiUrl, PublicKey} from "@solana/web3.js";


const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')
const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL')

const METADATA_PROGRAM_ID = 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'

const MEMO_ID = new PublicKey( 'MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr')


const programIds = {
    token: TOKEN_PROGRAM_ID,
    associatedToken: SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
    metadata: METADATA_PROGRAM_ID,
    memo: MEMO_ID,
}

const NETWORK = clusterApiUrl("devnet")

const AR_SOL_HOLDER_ID = new PublicKey('HvwC9QSAzvGXhhVrgPmauVwFWcYZhne3hVot9EbHuFTm')
const METADATA_PREFIX = 'metadata'
const EDITION = 'edition'
const EDITION_MARKER_BIT_SIZE = 248
const DEFAULT_TIMEOUT = 15000
const RESERVED_TXN_MANIFEST = 'manifest.json'
const MetadataKey = {
    Uninitialized : 0,
    MetadataV1 : 4,
    EditionV1 : 1,
    MasterEditionV1 : 2,
    MasterEditionV2 : 6,
    EditionMarker : 7,
}

// export const TOKEN_PROGRAM_ID = programIds.token



export {
    NETWORK,
    AR_SOL_HOLDER_ID,
    METADATA_PREFIX,
    EDITION,
    EDITION_MARKER_BIT_SIZE,
    DEFAULT_TIMEOUT,
    RESERVED_TXN_MANIFEST,
    TOKEN_PROGRAM_ID,
    SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
    METADATA_PROGRAM_ID,
    MEMO_ID,
    programIds,
    MetadataKey
}