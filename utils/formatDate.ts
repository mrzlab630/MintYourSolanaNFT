/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-10-15
 * Time: 12:43
 * About:
 *
 */


export interface IformatDateResult {
    year:string,
    month:string,
    date:string,
    hours:string,
    minutes:string,
    timezone:string,
    unixTime:number,
    string:string,
    stringT:string,
    stringRu:string
}


export interface IformatDate {
    (date?:string|number): IformatDateResult
}



const formatDate:IformatDate = function(date){

    let d = new Date()
    const addNUll = (d:number) => String( d < 10 ? `0${d}` : d )

    if(date && typeof date === "string" ){
        const foundDate = date.match(/([0-9]{2}).([0-9]{2}).([1-2][0-9]{3})/)
        const foundTime = date.match(/([0-9]{2}):([0-9]{2})/)

        const dateFormat = foundDate && foundDate.length  === 4 ? `${foundDate[3]}-${foundDate[2]}-${foundDate[1]}` : false
        const timeFormat = foundTime && foundTime.length  === 3 ? foundTime[0] : `00:00`

        const format = !dateFormat ? date : `${dateFormat} ${timeFormat}`

        d = new Date(format)
    }
    if(date && typeof date === "number"){


        d = new Date(date.toString().length === 10 ? date*1000 : date)
    }

    const fullYear = d.getFullYear()

    const month = addNUll(d.getMonth() + 1)

    const toDate = addNUll(d.getDate())

    const hours = addNUll(d.getHours())

    const minutes = addNUll(d.getMinutes())

    const timezone = addNUll(d.getTimezoneOffset() / 60)

    const unixTime = (d.getTime() / 1000).toFixed(0)


    return {
        year:String(fullYear),
        month,
        date:toDate,
        hours,
        minutes,
        timezone,
        unixTime:parseInt(unixTime,10),
        string:`${fullYear}-${month}-${toDate} ${hours}:${minutes}`,
        stringT:`${fullYear}-${month}-${toDate}T${hours}:${minutes}`,
        stringRu:`${toDate}.${month}.${fullYear} ${hours}:${minutes}`
    }


}


export default formatDate