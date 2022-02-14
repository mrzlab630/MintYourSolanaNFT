/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-09-30
 * Time: 13:51
 * About:
 *
 */
import CryptoJS from 'crypto-js'



export interface IencryptParams{
    str:string,
    secretKey:string
}

export interface Iencrypt {
    (v:IencryptParams):string
}
export interface Idecrypt {
    (v:IencryptParams):string
}


const encrypt:Iencrypt = ({str, secretKey}) => CryptoJS.AES.encrypt(str, secretKey).toString()



const decrypt:Idecrypt = ({str, secretKey}) => {

    const bytes  = CryptoJS.AES.decrypt(str, secretKey)
    const originalText = bytes.toString(CryptoJS.enc.Utf8)

    return originalText
}



export {
    encrypt,
    decrypt
}