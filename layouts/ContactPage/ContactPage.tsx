/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-11-16
 * Time: 12:16
 * About:
 *
 */
import {FC, useEffect, useState} from "react"
import {IContactPage} from './interface'
import classes from './ContactPage.module.scss'
import ContactForm from "../../components/ContactForm"
import {IContactFormCallbackParams} from "../../components/ContactForm/interface"
import Container from "../../components/Container"
import {feedback} from "../../apollo/requests"
import {useMutation} from "@apollo/client"
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import {Notification} from "../../components/Notification";
import {TINotificationType} from "../../components/Notification/interface";





const ContactPage: FC<IContactPage> = () => {

    const [showAlert,setShowAlert] = useState<boolean>(false)
    const [alertType,setAlertType] = useState<TINotificationType>('success')
    const [alertMessage,setAlertMessage] = useState<string|undefined>(undefined)

    //@ts-ignore
    const [feedbackFunc,{loading:feedbackLoading,data:feedbackData,error:feedbackErr}] = useMutation(feedback)


    useEffect(() =>{
        if(showAlert){
            setTimeout(() => setShowAlert(false), 6000)
        }
    },[showAlert])


    const getAddUserResult = (v:{err:any, data:any}):void =>{
        try {
            const {err,data} = v || false


            if(!err && !data){
                return
            }

            const errInfo = err?.message

            if(errInfo){
                throw new Error(errInfo)
            }

            const {result} = data?.feedback || false

            setShowAlert(true)
            setAlertType('success')
            setAlertMessage(result)


        }catch (e) {
            setShowAlert(true)
            setAlertType('error')
            setAlertMessage((e as Error).message)
        }

    }

    useEffect(() =>getAddUserResult({err:feedbackErr, data:feedbackData}),[feedbackData,feedbackErr])


    const handleGetContactForm = (variables:IContactFormCallbackParams) =>  feedbackFunc({variables})



    return <>
        <Notification
            position={'top-right'}
            type={alertType}
            open={showAlert}
            message={alertMessage}
        />
            <Container
                showNewNoteButton
            >
                <div className={classes.ContactPage}>
                    {
                        feedbackLoading ? <ProgressBar />
                                        : <>
                                            <h1 className={'title'}>contact us</h1>
                                            <ContactForm callback={handleGetContactForm}/>
                                        </>
                    }

                </div>
            </Container>
        </>
}

export default ContactPage