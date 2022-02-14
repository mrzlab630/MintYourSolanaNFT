/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2022-02-11
 * Time: 12:42
 * About:
 *
 */
import ChromeSvg from "../../assets/svg/chrome.svg"
import BraveSvg from "../../assets/svg/brave.svg"
import FireFoxSvg from "../../assets/svg/firefox.svg"
import EdgeSvg from "../../assets/svg/edge.svg"
import {ReactNode} from "react"



export interface ITransactionPrice{
    arweave:number,
    solana:number,
}

export type TAcceptFile = 'png' | 'gif' | 'jpg' | 'mp4' | 'mov' | 'mp3' | 'flac' | 'wav' | 'glb' | 'gltf' | 'html'
export type TsolanaNet = 'devnet'|'testnet'|'mainnet-beta'

export interface IAcceptFile{
    types:TAcceptFile[],
    size:number
}

export interface IBrowserExtensionsExtension{
    name:string,
    link:string,
    Icon:Function
}

export interface IBrowserExtensions{
    phantom:IBrowserExtensionsExtension[]
}



export interface IinitialStateSettings{
    solanaNet:TsolanaNet,
    browserExtensions:IBrowserExtensions
    transactionPrice:ITransactionPrice,
    acceptFile:IAcceptFile

}




export const initialStateSettings:IinitialStateSettings = {
    solanaNet:'mainnet-beta',
    browserExtensions:{
        phantom:[
            {
                name:'chrome',
                Icon:ChromeSvg,
                link: 'https://chrome.google.com/webstore/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa'
            },
            {
                name:'brave',
                Icon:BraveSvg,
                link: 'https://chrome.google.com/webstore/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa'
            },
            {
                name:'fireFox',
                Icon:FireFoxSvg,
                link: 'https://addons.mozilla.org/en-US/firefox/addon/phantom-app/'
            },
            {
                name:'edge',
                Icon:EdgeSvg,
                link: 'https://chrome.google.com/webstore/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa'
            },
        ]
    },
    acceptFile:{
        types:['png' , 'gif' , 'jpg' , 'mp4' , 'mov' , 'mp3' , 'flac' , 'wav' , 'glb', 'gltf' , 'html'],
        size:5
    },
    transactionPrice:{
        arweave:0.000050947968,
        solana:0.00912 + 0.00285 // Transaction + confirmed
    },
}