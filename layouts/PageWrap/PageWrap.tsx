/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-10-21
 * Time: 10:42
 * About:
 *
 */
import React, {FC} from "react"
import {IPageWrap} from './interface'
import classes from './PageWrap.module.scss'
import Container from "../../components/Container"




const PageWrap: FC<IPageWrap> = ({children}) => {

    return <Container
                showNewNoteButton
            >
                <div className={classes.PageWrap}>
                    {children}
                </div>
           </Container>
}

export default PageWrap