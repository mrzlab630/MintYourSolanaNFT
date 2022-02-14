/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-10-15
 * Time: 12:33
 * About:
 *
 */

const InfoInConsole = function():void{

    //  document.body.contentEditable=true; //редактор текста

    let css = 'color:red;';
    const d = new Date();
    const year = d.getFullYear();

    return console.log(`%c
─▌█──
─███─
─▐█▐─
─▐▐ 
─▐▐ 
──────────
© ${year} by mrZ
──────────────────
📧 mrZ@mrZLab630.pw
────────────────────────`, css);

};

export default InfoInConsole;