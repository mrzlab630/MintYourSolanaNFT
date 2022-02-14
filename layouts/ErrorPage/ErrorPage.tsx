/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-11-05
 * Time: 13:43
 * About:
 *
 */
import  {FC} from "react"
import {IErrorPage} from './interface'
import classes from "./ErrorPage.module.scss"
import Container from "../../components/Container"


const ErrorPage: FC<IErrorPage> = ({
                                       code,
                                       title,
                                       subText,
                                       children
                                   }) => {

    const renderCode = code.toString(10).split('').map(int =>  <span key={`renderCode-${int}`}>{int}</span>)

    return <Container
        showNewNoteButton
    >
        <div className={classes.ErrorPage}>
            <h2 className={classes.title}>Oops! {title}</h2>
            <h1 className={classes.code}>{renderCode}</h1>
            <div className={classes.subText}>
                {
                    subText
                }
            </div>
            {
                children
            }
        </div>
    </Container>
}

export default ErrorPage