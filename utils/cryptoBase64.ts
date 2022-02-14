/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-10-21
 * Time: 14:59
 * About:
 *
 */


export interface IcryptoBase64 {
    (sting:string):string
}
export interface IisBase64 {
    (sting:string):boolean
}


const isBase64:IisBase64 = (sting) => sting.trim().length % 4 == 0 && /^[A-Za-z0-9+/]+[=]{0,3}$/.test(sting)


const cryptoBase64:IcryptoBase64 = (sting) => (new Buffer(sting)).toString('base64')
const decryptBase64:IcryptoBase64 = (sting) => (new Buffer(sting.replace(/\s/g,'').replace(/\r?\n/g, ""), 'base64')).toString('utf-8')


const cryptoBase64WIN:IcryptoBase64 = (sting) => window ? window.btoa(sting) : ''
const decryptBase64WIN:IcryptoBase64 = (sting) => window ? window.atob(sting) : ''




export {
    cryptoBase64WIN,
    decryptBase64WIN,
    cryptoBase64,
    decryptBase64,
    isBase64
}