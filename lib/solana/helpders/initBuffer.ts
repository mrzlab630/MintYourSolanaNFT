/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-12-29
 * Time: 18:09
 * About:
 *
 */

const initBuffer = function (){

    if(typeof window === 'undefined'){
        return
    }

    (window as any).global = window
    window.Buffer = window.Buffer || require('buffer').Buffer
}



export default initBuffer