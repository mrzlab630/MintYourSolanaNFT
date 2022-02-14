/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-12-29
 * Time: 15:37
 * About:
 *
 */
import Assignable from "./Assignable";

class MintPrintingTokensArgs {
    instruction9:any;
    supply:any;
    constructor(args:{[index:string]:any}) {
        this.supply = args.supply;
    }
}

export default MintPrintingTokensArgs