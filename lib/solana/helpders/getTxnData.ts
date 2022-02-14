/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-12-29
 * Time: 18:12
 * About:
 *
 */

//import {Schema, BorshError, BinaryWriter, BinaryReader} from 'borsh'
import {serialize} from 'borsh'
import {IgetTxnData} from "../types/IgetTxnData"
import METADATA_SCHEMA from "../schemes"
import {extendBorsh} from '../helpders'


extendBorsh()

// function capitalizeFirstLetter(string:string) {
//     return string?.charAt(0).toUpperCase() + string.slice(1);
// }
// //@ts-ignore
// function serializeField(schema, fieldName, value, fieldType, writer) {
//     try {
//
//         console.log({schema, fieldName, value, fieldType, writer})
//
//         // TODO: Handle missing values properly (make sure they never result in just skipped write)
//         if (typeof fieldType === "string") {
//             if(writer){
//                 writer[`write${capitalizeFirstLetter(fieldType)}`](value);
//             }
//
//         }
//         else if (fieldType instanceof Array) {
//
//
//             if (typeof fieldType[0] === "number") {
//                 if (value.length !== fieldType[0]) {
//                     throw new BorshError(`Expecting byte array of length ${fieldType[0]}, but got ${value.length} bytes`);
//                 }
//                 writer.writeFixedArray(value);
//             }
//             else if (fieldType.length === 2 && typeof fieldType[1] === "number") {
//                 if (value.length !== fieldType[1]) {
//                     throw new BorshError(`Expecting byte array of length ${fieldType[1]}, but got ${value.length} bytes`);
//                 }
//                 for (let i = 0; i < fieldType[1]; i++) {
//                     serializeField(schema, null, value[i], fieldType[0], writer);
//                 }
//             }
//             else {
//                 //@ts-ignore
//                 writer.writeArray(value, (item) => {
//                     serializeField(schema, fieldName, item, fieldType[0], writer);
//                 });
//             }
//         }
//         else if (fieldType.kind !== undefined) {
//
//             switch (fieldType.kind) {
//                 case "option": {
//                     if (value === null || value === undefined) {
//                         writer.writeU8(0);
//                     }
//                     else {
//                         writer.writeU8(1);
//                         serializeField(schema, fieldName, value, fieldType.type, writer);
//                     }
//                     break;
//                 }
//                 case "map": {
//                     writer.writeU32(value.size);
//                     //@ts-ignore
//                     value.forEach((val, key) => {
//                         serializeField(schema, fieldName, key, fieldType.key, writer);
//                         serializeField(schema, fieldName, val, fieldType.value, writer);
//                     });
//                     break;
//                 }
//                 default:
//                     throw new BorshError(`FieldType ${fieldType} unrecognized`);
//             }
//         }
//         else {
//             serializeStruct(schema, value, writer);
//         }
//
//     }
//     catch (error) {
//         if (error instanceof BorshError) {
//             error.addToFieldPath(fieldName);
//         }
//         throw error;
//     }
// }
//
// function serializeStruct(schema:Schema, obj:{[k:string]:any}, writer:any) {
//
//     if (typeof obj?.borshSerialize === "function") {
//         obj.borshSerialize(writer);
//         return;
//     }
//
//     let structSchema = schema.get(obj.constructor);
//
//     console.log({structSchema,obj,writer})
//
//     if (!structSchema) {
//
//         throw new BorshError(`Class ${obj.constructor.name} is missing in schema`);
//     }
//     if (structSchema.kind === "struct") {
//         //@ts-ignore
//         structSchema.fields.map(([fieldName, fieldType]) => {
//             //@ts-ignore
//             serializeField(schema, fieldName, obj[fieldName], fieldType, writer);
//         });
//     }
//     else if (structSchema.kind === "enum") {
//
//         //@ts-ignore
//         const name = obj[structSchema.field];
//         for (let idx = 0; idx < structSchema.values.length; ++idx) {
//             const [fieldName, fieldType] = structSchema.values[idx];
//             if (fieldName === name) {
//                 writer.writeU8(idx);
//                 //@ts-ignore
//                 serializeField(schema, fieldName, obj[fieldName], fieldType, writer);
//                 break;
//             }
//         }
//     }
//     else {
//         throw new BorshError(`Unexpected schema kind: ${structSchema.kind} for ${obj.constructor.name}`);
//     }
//
//
// }
//
//
// function serialize(
//     schema: Schema,
//     obj:{[k:string]:any},
//     Writer = BinaryWriter
// ): Uint8Array {
//     const writer = new Writer();
//     serializeStruct(schema, obj, writer);
//     return writer.toArray();
// }








const getTxnData:IgetTxnData = (value) => Buffer.from(serialize(METADATA_SCHEMA, value))









export default getTxnData