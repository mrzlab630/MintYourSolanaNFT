/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-12-29
 * Time: 18:14
 * About:
 *
 */
import {BinaryWriter} from "borsh"



export interface IgetTxnData{
    (v: any, Writer?: typeof BinaryWriter):any
}