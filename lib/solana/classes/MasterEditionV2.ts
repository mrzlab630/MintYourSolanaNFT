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



class MasterEditionV2 {
    key;
    supply;
    maxSupply;
    constructor(args:{[index:string]:any}) {
        this.key = MetadataKey.MasterEditionV2;
        this.supply = args.supply;
        this.maxSupply = args.maxSupply;
    }
}


export default MasterEditionV2