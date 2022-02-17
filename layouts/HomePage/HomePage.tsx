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
import {IHomePage, ImintNFTtoSolana, IprintResult, IuploadAndMint, IuploadToArweave} from './interface'
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
import useWindowSize from "../../hooks/useWindowSize"

import AlertSvg from '../../assets/svg/alert.svg'
import useIsMobile from "../../hooks/useIsMobile"
import RenderBlock from "../../components/RenderBlock";
import {IRenderBlockOnChangeParams} from "../../components/RenderBlock/interface";









const HomePage: NextPage<IHomePage> = ({
                                           title,
                                           info,
}) => {

    const messagesEndRef = useRef<HTMLDivElement>(null)

    const isMobile = useIsMobile()
    const {width:winWidth} = useWindowSize()

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

    const [solanaMintKey, setSolanaMintKey] = useState<string|undefined>(undefined)


    const [phantomWalletPresent, setPhantomWalletPresent] = useState<boolean>(false)

    const [isSubtleCrypto, setIsSubtleCrypto] = useState<boolean>(false)



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

            setIsSubtleCrypto("crypto" in window)

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
            }
        ]

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



    //0. print result
    const printResult:IprintResult = async ({mintKey,solanaCluster}) =>{

        addLoggingProgress(`<span class="success">Successfully. Solana NFT Token created.</span>`)
        await delay(200)
        addLoggingProgress(`Mint Key: <a target="_blank" href="https://explorer.solana.com/address/${mintKey}/metadata?cluster=${solanaCluster}">${mintKey}</a>`)

    }

    //1. upload to arweave
    const uploadToArweave: IuploadToArweave = async ({walletKey,file,metadata}) => {
        try {

            const {
                error: errUploadInArweave,
                image: imageFromArweave,
                json: jsonFromArweave,
            } = await metaplexAddData({
                walletKey,
                file,
                metadata,
                logging: v => addLoggingProgress(v)
            })

            if (errUploadInArweave || !jsonFromArweave?.links || !imageFromArweave?.links) {
                throw new Error(errUploadInArweave)
            }

            const {uri: imageMetadataUri} = jsonFromArweave?.links
            const {uri: imageFileUri} = imageFromArweave?.links

            if (!imageFileUri || !imageMetadataUri) {
                throw new Error('fatal error')
            }

            return {
                imageFileUri,
                imageMetadataUri
            }


        } catch (e) {
            const err = e as Error
            return {error: err.message || 'fatal error'}
        }

    }

    //2. mint NFT to solana
    const mintNFTtoSolana: ImintNFTtoSolana = async ({cluster,wallet,metadata}) => {
        try {
            addLoggingProgress(`Starting Solana NFT Token minting`)

            await delay(200)

            addLoggingProgress(`Pending...`)

            const mintSolNFT = await mintNFT({
                cluster,
                wallet,
                metadata
            })

            const {error: mintSolNFTErr, result: mintSolNFTRes} = mintSolNFT

            if (mintSolNFTErr || !mintSolNFTRes) {
                throw new Error(mintSolNFTErr || 'fatal error')
            }

            const {mintKey} = mintSolNFTRes

            return {mintKey}

        } catch (e) {
            const err = e as Error
            return {error: err.message || 'fatal error'}
        }

    }

    //3. upload to arweave and mint NFT to solana
    const uploadAndMint:IuploadAndMint = async ({
                                                    metadata,
                                                    arweaveWalletKey,
                                                    file,
                                                    arweaveUri
    }) =>{
        try {

            let imageMetadataUri

            if (file && arweaveWalletKey) {

                if (!arweaveWalletKey) {
                    throw new Error(`arweave key file is undefined`)

                }

                const {
                    error: errUploadToArweave,
                    imageMetadataUri: UploadToArweave
                } = await uploadToArweave({metadata,walletKey:arweaveWalletKey,file})


                if (errUploadToArweave || !UploadToArweave) {
                    throw  new Error(errUploadToArweave || `can't upload to Arweave`)
                }

                imageMetadataUri = UploadToArweave

            } else {
                imageMetadataUri = arweaveUri
            }

            if (!imageMetadataUri) {
                throw  new Error(`can't get the link to the asset on Arweave`)
            }

            const creatorsAll = metadata.properties.creators ?? []

            const creators = creatorsAll.filter(itm => {
                const {address:addressItm,share:shareItm} = itm

                return addressItm && addressItm.length > 0 && shareItm
            })


            const metadataForSolana = {
                cluster: solanaCluster,
                wallet: solanaWallet,
                metadata: {
                    name: metadata.name,
                    symbol: metadata.symbol,
                    uri: imageMetadataUri,
                    sellerFeeBasisPoints: metadata.seller_fee_basis_points,
                    creators
                }
            }

            //@ts-ignore
            const {error: mintErr, mintKey} = await mintNFTtoSolana(metadataForSolana)

            if (mintErr || !mintKey) {
                throw  new Error(mintErr || `can't upload to Solana`)
            }

            printResult({solanaCluster,mintKey})

            return {mintKey}


        }catch (e) {
            const err = e as Error
            addLoggingProgress(`<span class="success">${err?.message || `fatal error`}</span>`)
            return {error: err.message || 'fatal error'}
        }
    }



    const handleGetMetaplexData = async (v?:IMetaplexDataFormCallbackParams) => {
        try {


            const {error: errInfo, metadata} = dataSerialization(v)


            if (errInfo || !metadata) {
                throw  new Error(errInfo)
            }

            // @ts-ignore
            const {upload_file} = v || undefined

            delete v?.upload_file

            addToDefaultNFTMetadata(v as IinitialStateDefaultNFTMetadata)


            setIsLoading(true)
            setStepperPosition(3)

            if (!arweaveWalletKey) {
                throw new Error(`arweave key file is undefined`)
            }

            const {error,mintKey} = await uploadAndMint({
                metadata,
                arweaveWalletKey,
                file:upload_file[0],
            })

            if (error) {
                throw new Error(error)
            }


            setSolanaMintKey(mintKey)

            setIsLoading(false)

        }catch (e) {
            const err = e as Error

            showAlertInfo({
                str: err?.message || `fatal error`,
                type: 'error'
            })


            setIsLoading(false)
        }


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

    const handleGetMetaplexFromArweave = async (v:IRenderBlockOnChangeParams) =>{
        try {

            const {value} = v


            if(!value || typeof value !== "string"){
                return
            }

            // const regexObj = /https:\/\/(.*).arweave.net\/(.*)/ig
            // const testLink = regexObj.test(value)
            const regexObjA = /(.*)arweave.net\/(.*)/ig
            const testLinkA = regexObjA.test(value)

            if(!testLinkA){
                throw new Error(`The link is't correct`)
            }

            setIsLoading(true)

            setStepperPosition(3)
            addLoggingProgress(`<span>downloading metadata from Arweave</span>`)


            const getMetaData = await fetch(value,{
                method:'GET',
                mode: 'cors',
                headers:{
                    'Content-Type': 'application/json'
                }
            })


            const metadata = await getMetaData?.json()

            if(!metadata){
                throw new Error(`can't get data from metaDataJson`)
            }

            addLoggingProgress(`<span>metadata downloaded successfully</span>`)


          const {error,mintKey} = await uploadAndMint({
              metadata,
              arweaveUri:value
            })

            if (error) {
                throw new Error(error)
            }


            setSolanaMintKey(mintKey)
            setIsLoading(false)

        }catch (e) {
            const err = e as Error

            addLoggingProgress(`<span class="success">${err?.message || `fatal error`}</span>`)

            showAlertInfo({
                str: err?.message || `fatal error`,
                type: 'error'
            })

            setIsLoading(false)
        }

    }

    const header = <div className={classes.progressStatus}>
        {
            isLoading ?  <ProgressBar/> : solanaWallet && <Select
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

        <div className={classes.separator}>or</div>

        <RenderBlock
            type={'text'}
            tooltip={'link to Metaplex json data in arweave'}
            lable={'I have already uploaded an asset on arweave'}
            onChange={handleGetMetaplexFromArweave}
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


    const usePc = <div className={classes.HomePage}>
            <AlertSvg className={classes.iconErr} />
            <span className={classes.alert}>please use a desktop PC </span>
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
                    !initPage ? <ProgressBar/> :
                                        !isSubtleCrypto || isMobile ? usePc
                                                : renderPage
                }
            </Container>
        </>
}


export default HomePage