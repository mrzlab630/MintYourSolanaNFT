/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-10-19
 * Time: 18:19
 * About:
 *
 */


export interface Idelay {
    (time:number):Promise<void>
}


const delay:Idelay = function (time){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, time);
    });
}


export default delay