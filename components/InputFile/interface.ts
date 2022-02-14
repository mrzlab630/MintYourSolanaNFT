/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2022-02-10
 * Time: 17:29
 * About:
 *
 */
import {ButtonSize} from "../Button/interface"



export interface IInputFile {
    name:string,
    disabled?:boolean,
    size?:ButtonSize,
    onChange: (v:FileList)=>void
}