/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-12-29
 * Time: 15:33
 * About:
 *
 */



export class Creator {
    address:string;
    verified:boolean|1|0;
    share:number;
    constructor(args:{[index:string]:any}) {
        this.address = args.address;
        this.verified = args.verified;
        this.share = args.share;
    }
}


export default Creator