/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-12-29
 * Time: 15:42
 * About: Helper function to convert base64 to file object
 *
 */

const dataURLtoFile = (dataurl:any, filename:string) => {
    let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = Buffer.from(arr[1], "utf8").toString("base64"), //atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    const file = new File([u8arr], filename, {type:mime});

    return file
}


export default dataURLtoFile