/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-12-29
 * Time: 15:33
 * About:
 *
 */
import {MetadataKey} from '../constants'
import Assignable from "./Assignable";


class Edition {
    key;
    /// Points at MasterEdition struct
    parent;
    /// Starting at 0 for master record, this is incremented for each edition minted.
    edition;
    constructor(args:{[index:string]:any}) {
        this.key = MetadataKey.EditionV1;
        this.parent = args.parent;
        this.edition = args.edition;
    }
}


export default Edition