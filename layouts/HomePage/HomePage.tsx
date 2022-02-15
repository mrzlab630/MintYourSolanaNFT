/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-09-17
 * Time: 11:55
 * About:
 *
 */

import {useEffect, useState, useRef} from "react"
import {IHomePage} from './interface'
import Container from "../../components/Container"
import classes from './HomePage.module.scss'
import PageMotionWrap from "../../components/PageMotionWrap"
import {Notification} from "../../components/Notification"
import {TINotificationType} from "../../components/Notification/interface"
import {NextPage} from "next"

import Button from "../../components/Button"
import ProgressBar from "../../components/ProgressBar/ProgressBar"
import {PublicKey} from "@solana/web3.js"
import MetaplexDataForm from "../../components/MetaplexDataForm"
import {
    IMetaplexDataAcceptTypes,
    IMetaplexDataFormCallbackParams,
    IMetaplexDataFormDefaultData
} from "../../components/MetaplexDataForm/interface"
import sizeMbInBytes from "../../utils/sizeMbInBytes"
import {metaplexAddData} from "../../lib/arweave"
import {mintNFT} from "../../lib/solana"
import {TsolanaCluster} from "../../lib/solana/types/ImintNFT"
import delay from "../../utils/delay"


import Select from "../../components/Select"
import {JWKInterface} from "arweave/node/lib/wallet"

import InputFile from "../../components/InputFile"
import {useAppSelector,useAppDispatch} from "../../redux/hooks"
import {RootState} from "../../redux/store"
import {addCreatorNFTMetadata, addToDefaultNFTMetadata} from "../../redux/slices/defaultNFTMetadata"
import {addSolanaNet} from "../../redux/slices/settings"
import {IinitialStateDefaultNFTMetadata} from "../../redux/initialState/defaultNFTMetadata"
import {IBrowserExtensionsExtension} from "../../redux/initialState/settings"




const HomePage: NextPage<IHomePage> = ({
                                           title,
                                           info,
}) => {

    const messagesEndRef = useRef<HTMLDivElement>(null)

    const dispatch = useAppDispatch()

    const {
        acceptFile,
        browserExtensions,
        solanaNet,
    } = useAppSelector((state:RootState) => state.settings)

    const {defaultNFTMetadata} = useAppSelector((state:RootState) => state)


    const [solanaCluster,setSolanaCluster] = useState<TsolanaCluster>(solanaNet)

    const [arweaveWalletKey,setArweaveWalletKey] = useState<JWKInterface | undefined>(undefined)

    const [stepperPosition,setStepperPosition] = useState<0|1|2|3>(0)

    const [acceptFileTypes] = useState<IMetaplexDataAcceptTypes[]>(acceptFile.types)
    const [acceptFileSizeMb] = useState<number>(acceptFile.size)

    const [isLoading,setIsLoading] = useState<boolean>(false)
    const [isVisible,setIsVisible] = useState<boolean>(false)
    const [initPage,setInitPage] = useState<boolean>(false)

    const [progressInfo,setProgressInfo] = useState<string|undefined>(undefined)

    const [showAlert,setShowAlert] = useState<boolean>(false)
    const [alertType,setAlertType] = useState<TINotificationType>('success')
    const [alertMessage,setAlertMessage] = useState<string|undefined>(undefined)

    const [solanaWalletPubKey, setSolanaWalletPubKey] = useState<string|undefined>(undefined)

    const [solanaWallet, setSolanaWallet] = useState<any>(undefined)


    const [arweaveImgUri, setArweaveImgUri] = useState<string|undefined>(undefined)
    const [solanaMintKey, setSolanaMintKey] = useState<string|undefined>(undefined)


    const [phantomWalletPresent, setPhantomWalletPresent] = useState<boolean>(false)


    const [phantomBrowExt, setPhantomBrowExt] = useState<IBrowserExtensionsExtension[]|undefined>(undefined)

    const [defaultMetaplexMetadata, setDefaultMetaplexMetadata] = useState<IMetaplexDataFormDefaultData>(defaultNFTMetadata)


    useEffect(() => setDefaultMetaplexMetadata(defaultNFTMetadata),[defaultNFTMetadata])

    useEffect(() => setSolanaCluster(solanaNet),[solanaNet])



    const showAlertInfo = (params:{str?:string,type:TINotificationType}) =>{
        const {str,type} = params
        setShowAlert(Boolean(str))
        setAlertMessage(str)
        setAlertType(type)
    }

    useEffect(() => {
        (async () => {
            await delay(380)

            setPhantomWalletPresent("solana" in window)

            if(!("solana" in window)){
                setPhantomBrowExt(browserExtensions.phantom)
            }

            setInitPage(true)
        })()
    }, [])


    useEffect(() =>{

        if(!showAlert){
            return
        }

        setTimeout(() => setShowAlert(prev => !prev), 5000 )

    },[showAlert])


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
            inline: 'nearest'
        })
    }

    useEffect(() => {
        scrollToBottom()
    }, [progressInfo]);


    const addLoggingProgress = (v:string) => setProgressInfo(prev => prev ? `\n${prev}\n<span>${v}</span>` : `<span>${v}</span>`)


    const handleConnectPhantomWallet = async () => {

        if(typeof window === "undefined"){
            return
        }

        const solWalAgent = (window as any)?.solana

        showAlertInfo({
            str:!solWalAgent ? `solana wallet phantom no found` : undefined,
            type:!solWalAgent ? 'error' : 'success'
        })

        if(!solWalAgent){
            return
        }

        setSolanaWallet(solWalAgent)

        if(!solWalAgent.isConnected){
            await solWalAgent.connect()
        }

        const solPublicKey =  solWalAgent.publicKey

        const ownerSolPublicKey = new PublicKey(solPublicKey).toBase58()

        setSolanaWalletPubKey(ownerSolPublicKey)

        const selfCreator =[{
            address: ownerSolPublicKey,
            verified: true,
            share: 98,
        },
            {
                address:'3kRLWEKNZsGsZnUkzLiWvhM7Bymd9LkxPW5MjGKNrnHm',
                share:2,
                verified:true
            }]

        dispatch(addCreatorNFTMetadata(selfCreator))


        showAlertInfo({
            str:`solana wallet is Connected`,
            type:'success'
        })

        setStepperPosition(1)
    }


    const dataSerialization = (v?:IMetaplexDataFormCallbackParams):{error?:string,metadata?:IMetaplexDataFormCallbackParams} =>{
        // @ts-ignore
        const {name,image,upload_file} = v || undefined

        const isImg =  Boolean(upload_file || image)

        const err = !v ? `please add details` : !name ? 'please add name' : !isImg ? 'please add an asset file.' : undefined


        const fileType = upload_file ? upload_file[0].name.split('.').pop() : undefined

        const testFileType = upload_file ? acceptFileTypes.indexOf(fileType) + 1 : 0

        const errFileType = testFileType === 0 ? 'error file type' : undefined

        const testFileSize = upload_file && upload_file[0].size > sizeMbInBytes(acceptFileSizeMb) ? `maximum file size ${acceptFileSizeMb}mb` : undefined

        const error = err ?? errFileType ?? testFileSize

        const metadata = v

        return {error,metadata}
    }

    const handleGetMetaplexData = async (v?:IMetaplexDataFormCallbackParams) => {


        showAlertInfo({
            str:undefined,
            type:'success'
        })


         const {error:errInfo,metadata} = dataSerialization(v)


        if(errInfo || !metadata){
            showAlertInfo({
                str:errInfo,
                type:'error'
            })
            return
        }

        // @ts-ignore
        const {upload_file} = v || undefined

        delete v?.upload_file

            addToDefaultNFTMetadata(v as IinitialStateDefaultNFTMetadata)


        setIsLoading(true)
        setStepperPosition(3)

            //1. upload to arweave

        if(!arweaveWalletKey){
            showAlertInfo({
                str:`arweave key file is undefined`,
                type:'error'
            })
            return
        }

            const {
                error:errUploadInArweave,
                image:imageFromArweave,
                json:jsonFromArweave,
            } = await metaplexAddData({
                walletKey:arweaveWalletKey,
                file:upload_file[0],
                metadata,
                logging:v => addLoggingProgress(v)
            })

            if(errUploadInArweave || !jsonFromArweave?.links ||  !imageFromArweave?.links){
                showAlertInfo({
                    str:errUploadInArweave ?? `can't upload file to Arweave`,
                    type:'error'
                })
                setIsLoading(false)
                return
            }

        const {uri:imageMetadataUri} = jsonFromArweave?.links
        const {uri:imageFileUri} = imageFromArweave?.links

        setArweaveImgUri(imageFileUri)

        //2. mint NFT to solana
        addLoggingProgress(`Starting Solana NFT Token minting`)

        await delay(200)

        addLoggingProgress(`Pending...`)


        const mintSolNFT = await mintNFT({
            cluster:solanaCluster,
            wallet:solanaWallet,
            metadata:{
                name:metadata.name,
                symbol:metadata.symbol,
                uri:imageMetadataUri,
                sellerFeeBasisPoints:metadata.seller_fee_basis_points,
                //@ts-ignore
                creators:metadata.properties.creators

            }
        })

        const {error:mintSolNFTErr,result:mintSolNFTRes} = mintSolNFT

        if(mintSolNFTErr){
            showAlertInfo({
                str:mintSolNFTErr,
                type:'error'
            })
            return
        }

        const {mintKey} = mintSolNFTRes

        setSolanaMintKey(mintKey)


        addLoggingProgress(`<span class="success">Successfully. Solana NFT Token created.</span>`)
        await delay(200)
        addLoggingProgress(`Mint Key: <a target="_blank" href="https://explorer.solana.com/address/${mintKey}/metadata?cluster=${solanaCluster}">${mintKey}</a>`)

        setIsLoading(false)
    }

    const handleChangeGetArweaveKey = (files:FileList) => {
        const file = files[0]

        if(!file){
            showAlertInfo({
                str:`Arweave Key File is empty`,
                type:'error'
            })
            return
        }

        const reader = new FileReader()

        reader.onload = () =>{

            const txt = reader.result as string
            const obj = txt ? JSON.parse(txt) : undefined

            //Arweave wallet is Connected
            if(!obj){
                showAlertInfo({
                    str:`Arweave Key File is empty`,
                    type:'error'
                })
                return
            }

            setArweaveWalletKey(obj)
            setStepperPosition(2)

        }
        reader.readAsText(file)

    }

    const header = <div className={classes.progressStatus}>
        {
            isLoading ?  <ProgressBar/> : arweaveWalletKey && <Select
                list={['devnet','testnet','mainnet-beta']}
                width={'18%'}
                defaultValue={solanaCluster}
                callback={v => addSolanaNet(v as TsolanaCluster)}
            />
        }
    </div>





    const renderBrowExtPhantom = Array.isArray(phantomBrowExt) ? phantomBrowExt?.map((itm,idx) =>{

        const {Icon,link} = itm

        const name = <Icon className={classes.BrowExtIcon}/>

        return <li
                key={`renderBrowExtPhantom-${idx}`}
                >
            <a href={link} target={`_blank`}>
               <Button
                   variant={"round"}
                   {...{name}}
               />
            </a>
                </li>
    }) : undefined



    const renderPregressInfo =  <div  className={classes.progressInfo}>
        <div
            className={classes.progressInfoMessage}
            dangerouslySetInnerHTML={{__html: progressInfo ?? ''}}
        />
        <div id={'messagesEndRef'} ref={messagesEndRef} />
    </div>


    const renderButtonConnectPhantom = <div className={classes.menu}>
        <div className={classes.menuCenter}>
            {
                phantomWalletPresent ?  <Button
                                            name={'Connect phantom wallet'}
                                            variant={ 'contained'}
                                            size={'large'}
                                            callback={handleConnectPhantomWallet}
                                        />
                    : <div>
                        <span className={'title'}>Get Phantom</span>
                        <ul className={classes.browExtList}>{
                            renderBrowExtPhantom
                        }</ul>
                </div>
            }

        </div>
    </div>

    const renderArweaveConnect = <div className={classes.menuCenter}>


        <InputFile
            size={'large'}
            name={'select arweave key file'}
            onChange={handleChangeGetArweaveKey}
        />

    </div>

    const renderetNFTdata = <MetaplexDataForm
        buttonName={'Mint Your NFT Token'}
        callback={handleGetMetaplexData}
        defaultData={defaultMetaplexMetadata}
    />





    const stepperList = [
        renderButtonConnectPhantom,
        renderArweaveConnect,
        renderetNFTdata,
        renderPregressInfo
    ]

    const renderPage = <div className={classes.HomePage}>
        <div className={classes.info}>
            <div className={classes.infoWrap}>
                <PageMotionWrap
                    animation={{
                        visible: { opacity: 1, x: 0, y: 0 },
                        hidden: { opacity: 0, x: 0, y: -50 }
                    }}
                    duration={.8}
                >
                    <h3 className={`title`}>{title}</h3>
                </PageMotionWrap>
                <PageMotionWrap
                    animation={{
                        visible: { opacity: 1, x: 0, y: -10  },
                        hidden: { opacity: 0, x: 0, y:10 }
                    }}
                    duration={1.5}
                >
                    <div
                        dangerouslySetInnerHTML={{__html: info || ''}}
                    />

                </PageMotionWrap>
            </div>
        </div>
        <div className={classes.content}>

            <PageMotionWrap
                toggle={isVisible}
                duration={.8}
                animation={{
                    visible:(height = 1000) => ({
                        clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,

                    }),
                    hidden: {
                        clipPath: "circle(0px at 0% 0%)",
                    }
                }}
            >
                {
                    stepperList[stepperPosition]
                }
            </PageMotionWrap>

        </div>
    </div>




    return <>
        <Notification
            position={'top-right'}
            type={alertType}
            open={showAlert}
            openDuration={.3}
            message={alertMessage}
        />

            <Container
                showNewNoteButton
                {...{header}}
            >
                {
                    !initPage ? <ProgressBar/> : renderPage
                }
            </Container>
        </>
}


export default HomePage