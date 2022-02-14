/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-12-29
 * Time: 15:36
 * About:
 *
 */
import {MetadataKey} from '../constants'
import {getEdition} from "../"
import Assignable from "./Assignable";

class Metadata {
    key:any;
    updateAuthority:any;
    mint:any;
    data:any;
    primarySaleHappened:any;
    isMutable:any;
    editionNonce:any;
    // set lazy
    masterEdition:any;
    edition:any;
    constructor(args:{[index:string]:any}) {
        this.key = MetadataKey.MetadataV1;
        this.updateAuthority = args.updateAuthority;
        this.mint = args.mint;
        this.data = args.data;
        this.primarySaleHappened = args.primarySaleHappened;
        this.isMutable = args.isMutable;
        this.editionNonce = args.editionNonce;
    }
    async init() {
        const edition = await getEdition(this.mint);
        this.edition = edition;
        this.masterEdition = edition;
    }
}


export default Metadata