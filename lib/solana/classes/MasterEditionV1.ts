/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-12-29
 * Time: 15:38
 * About:
 *
 */
import {MetadataKey} from '../constants'
import Assignable from "./Assignable";

class MasterEditionV1 {
    key;
    supply;
    maxSupply;
    /// Can be used to mint tokens that give one-time permission to mint a single limited edition.
    printingMint;
    /// If you don't know how many printing tokens you are going to need, but you do know
    /// you are going to need some amount in the future, you can use a token from this mint.
    /// Coming back to token metadata with one of these tokens allows you to mint (one time)
    /// any number of printing tokens you want. This is used for instance by Auction Manager
    /// with participation NFTs, where we dont know how many people will bid and need participation
    /// printing tokens to redeem, so we give it ONE of these tokens to use after the auction is over,
    /// because when the auction begins we just dont know how many printing tokens we will need,
    /// but at the end we will. At the end it then burns this token with token-metadata to
    /// get the printing tokens it needs to give to bidders. Each bidder then redeems a printing token
    /// to get their limited editions.
    oneTimePrintingAuthorizationMint;
    constructor(args:{[index:string]:any}) {
        this.key = MetadataKey.MasterEditionV1;
        this.supply = args.supply;
        this.maxSupply = args.maxSupply;
        this.printingMint = args.printingMint;
        this.oneTimePrintingAuthorizationMint =
            args.oneTimePrintingAuthorizationMint;
    }
}


export default MasterEditionV1