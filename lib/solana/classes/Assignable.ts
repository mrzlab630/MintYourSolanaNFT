/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-12-30
 * Time: 16:09
 * About:
 *
 */

class Assignable
{
    [index:string]:any;
    constructor(properties:{[index:string]:any})
    {
        Object.keys(properties).map((key:string) => {
            this[key] = properties[key];
        });
    }
}


export default Assignable