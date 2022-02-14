/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-12-29
 * Time: 15:32
 * About:
 *
 */
import Assignable from "./Assignable";




class CreateMasterEditionArgs {
    instruction = 10;
    maxSupply;
    constructor(args:{[index:string]:any}) {
        this.maxSupply = args.maxSupply;
    }
}


export default CreateMasterEditionArgs