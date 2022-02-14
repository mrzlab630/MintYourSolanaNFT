/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2022-02-11
 * Time: 16:18
 * About:
 *
 */
import {IMetaplexDataList} from "../../components/MetaplexDataForm/interface"



export interface IinitialStateMetaplexData{
    properties:IMetaplexDataList[],
    attributes:IMetaplexDataList[],
    list:IMetaplexDataList[]
}


export const initialStateMetaplexData:IinitialStateMetaplexData = {
    properties:[
        {
            field:'category',
            type:'list',
            list:['image','video','audio','vr','html'],
            description:`Supported categories:
                            "image" - PNG, GIF, JPG
                            "video" - MP4, MOV
                            "audio" - MP3, FLAC, WAV
                            "vr" - 3D models; GLB, GLTF
                            "html" - HTML pages; scripts and relative paths within the HTML page are also supported`
        },


        {
            //because I use the file uploading to arweave
            hide:true,
            field:'files',
            addMore:true,
            type:'object',
            object:[
                {
                    field:'uri',
                    type:'text',
                    description:'rURL to the image of the asset. PNG, GIF and JPG file formats are supported. You may use the ?ext={file_extension} query to provide information on the file type.'
                },
                {
                    field:'type',
                    type:'list',
                    list:[
                        'unknown',
                        'image/png',
                        'image/gif',
                        'image/jpg',
                        'video/mp4',
                        'video/quicktime',
                        'audio/mpeg',
                        'vaudio/flac',
                        'audio/x-wav',
                        'text/html'
                    ],

                    description:'type of the file that is part of the asset.'
                },
                // {
                //     field:'cdn',
                //     type:'checkbox',
                //     description:' your assets on a CDN (to provide faster loading times)'
                // },
            ],
            description:`Supported categories:
                            "image" - PNG, GIF, JPG
                            "video" - MP4, MOV
                            "audio" - MP3, FLAC, WAV
                            "vr" - 3D models; GLB, GLTF
                            "html" - HTML pages; scripts and relative paths within the HTML page are also supported`
        },

        {
            field:'collection',
            type:'object',
            object:[
                {
                    field:'family',
                    type:'text',
                    description:`represents the larger set of NFTs your asset can belong to, in the case you are making multiple variations on a theme. It should always be a unique identifier of your whole project and never a general term like "cars", "art" or similar.  Wallets might group NFTs belonging to the same family and display the collection name on a single NFT view.`
                },
                {
                    field:'name',
                    type:'text',
                    description:`the name of the collection`
                },
            ],
            description:`If the NFT belongs to a group of other unique NFTs, you can mark them with an additional collection field that contains the name of the collection.`
        },
        {
            field:'creators',
            type:'object',
            addMore:true,
            object:[
                {
                    field:'address',
                    type:'text',
                    description:`public key of each creator`
                },
                {
                    field:'share',
                    type:'number',
                    description:`shown as a percentage received by each co-creator`
                },
                // {
                //     field: 'verified',
                //     type:'number',
                //     description:`whether the collection is verified or not.`
                // }
            ],
            description:`shown in the single NFT view, resolved to twitter handles if they are connected via Solana Name Service`
        },
    ],
    attributes:[
        {
            field:'attributes',
            type:'object',
            addMore:true,
            object:[
                {
                    field:'trait_type',
                    type:'text',
                    description:``
                },
                {
                    field:'value',
                    type:'text',
                    description:``
                },
            ],
            description:``
        },
    ],
    list:[
        {
            field:'name',
            type:'text',
            description:'name of the asset'
        },
        {
            field:'symbol',
            type:'text',
            description:'symbol of the asset'
        },
        {
            //because I use the file uploading in arweave
            hide:true,
            field:'image',
            type:'text',
            description:'URL to the image of the asset. PNG, GIF and JPG file formats are supported. You may use the ?ext={file_extension} query to provide information on the file type.'
        },
        {
            field:'upload_file',
            type:'file',
            acceptTypes:['png','gif','jpg','mp4','mov','mp3','flac','wav','glb','gltf','html'],
            description:'the file of the asset. PNG, GIF, JPG, MP4, MOV, MP3, FLAC, WAV,GLB, GLTF and HTML file formats are supported. '
        },
        {
            field:'animation_url',
            type:'text',
            description:'URL to a multi-media attachment of the asset. The supported file formats are MP4 and MOV for video, MP3, FLAC and WAV for audio, GLB for AR/3D assets, and HTML for HTML pages. You may use the ?ext={file_extension} query to provide information on the file type.'
        },
        {
            field:'external_url',
            type:'text',
            description:'URL to an external application or website where users can also view the asset.'
        },
        {
            field:'description',
            type:'text',
            description:'Human readable description of the asset'
        },
        {
            field:'seller_fee_basis_points',
            type:'number',
            description:'royalties percentage awarded to creators'
        },
    ]

}