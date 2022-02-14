/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-12-29
 * Time: 15:36
 * About:
 *
 */


class Data {
    name:string;
    symbol:string;
    uri:string;
    sellerFeeBasisPoints:number;
    creators:{address:string,share:number,verified:boolean|1|0}[];
    constructor(args:{[index:string]:any}) {
        this.name = args.name;
        this.symbol = args.symbol;
        this.uri = args.uri;
        this.sellerFeeBasisPoints = args.sellerFeeBasisPoints;
        this.creators = args.creators;
    }
}


export default Data