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


class UpdateMetadataArgs {
    instruction= 1;
    data;
    // Not used by this app, just required for instruction
    updateAuthority:any;
    primarySaleHappened:any;
    constructor(args:{[index:string]:any}) {
        this.data = args.data;
        this.updateAuthority = args.updateAuthority;
        this.primarySaleHappened = args.primarySaleHappened;
    }
}
// class UpdateMetadataArgs extends Assignable {
//     public instruction:number = 1;
//     constructor(properties:{[index:string]:any}){
//         super(properties);
//     }
// }



export default UpdateMetadataArgs