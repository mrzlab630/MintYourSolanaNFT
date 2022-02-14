/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-12-29
 * Time: 15:31
 * About:
 *
 */


class CreateMetadataArgs {
    instruction:number= 0;
    data:any;
    isMutable:boolean;
    constructor(args:{[index:string]:any}) {
        this.data = args.data;
        this.isMutable = args.isMutable;
    }
}




export default CreateMetadataArgs