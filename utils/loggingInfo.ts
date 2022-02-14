/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2022-01-26
 * Time: 11:42
 * About:
 *
 */

export interface loggingInfoParams{
    callback?:boolean|Function,
    str:string
}

export interface loggingInfo{
    (params:loggingInfoParams):string|void
}

const loggingInfo:loggingInfo = function ({callback,str}){

    switch (typeof callback) {

        case "boolean":
            return callback ? console.info(str) : undefined

        case "function":
            return callback(str)

        default:
            return
    }

}


export default loggingInfo