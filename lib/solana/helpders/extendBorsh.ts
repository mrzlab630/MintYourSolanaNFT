/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-12-29
 * Time: 15:44
 * About: Utility to add functionality to BinaryReader
 *
 */
import {BinaryReader, BinaryWriter} from "borsh"
import {PublicKey} from "@solana/web3.js"
import base58 from "bs58"




const extendBorsh = () => {
    //@ts-ignore
    (BinaryReader.prototype).readPubkey = function () {
        const reader = this;
        const array = reader.readFixedArray(32);
        return new PublicKey(array);
    };
    //@ts-ignore
    (BinaryWriter.prototype).writePubkey = function (value) {
        const writer = this;
        writer.writeFixedArray(value.toBuffer());
    };
    //@ts-ignore
    (BinaryReader.prototype).readPubkeyAsString = function () {
        const reader = this;
        const array = reader.readFixedArray(32);
        return base58.encode(array);
    };
    //@ts-ignore
    (BinaryWriter.prototype).writePubkeyAsString = function (
        value:string,
    ) {
        const writer = this;
        writer.writeFixedArray(base58.decode(value));
    };
};


export default extendBorsh