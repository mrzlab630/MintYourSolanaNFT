/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-10-21
 * Time: 15:50
 * About:
 *
 */
import {FC, useState} from "react"
import {IContactForm, IContactFormCallbackParams} from './interface'
import classes from './ContactForm.module.scss'
import Input from "../Input"
import Textarea from "../Textarea"
import Button from "../Button"
import PaperPlaneSvg from '../../assets/svg/paper-plane.svg'
import {IInputCallbackParams} from "../Input/interface"



const ContactForm: FC<IContactForm> = ({callback}) => {

    const [sendData, setSendData] = useState<IContactFormCallbackParams|undefined>(undefined)


    const handleChangeTextarea = (type:string) => (v:IInputCallbackParams) => setSendData(prev => !prev ? {[type]:v} : {...prev,[type]:v})

    const handleClickResult = () =>sendData ? callback(sendData) : null


    return <div className={classes.ContactForm}>
               <div className={classes.row}>
                   <Input
                       type={'text'}
                       placeholder={'your name'}
                       className={classes.input}
                       classWrap={classes.inputWrap}
                       onChange={handleChangeTextarea('name')}
                   />
                   <Input
                       type={'email'}
                       placeholder={'your email'}
                       className={classes.input}
                       classWrap={classes.inputWrap}
                       onChange={handleChangeTextarea('email')}
                   />
               </div>

               <div className={classes.row}>
                <Textarea
                    classWrap={classes.textareaWrap}
                    classTextarea={classes.textarea}
                    onChange={handleChangeTextarea('message')}
                />
               </div>
                <div className={classes.row}>
                    <div className={classes.sendBtn}>
                        <Button
                            callback={handleClickResult}
                        >
                            <PaperPlaneSvg/><span>send</span>
                        </Button>
                    </div>
                </div>
            </div>
}

export default ContactForm