/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2022-01-25
 * Time: 16:47
 * About:
 *
 */

export interface IsizeMbInBytes{
    (sizeInMeB:number): number
}


const sizeMbInBytes:IsizeMbInBytes = (sizeInMeB) => sizeInMeB * Math.pow(1024, 2)



export default sizeMbInBytes