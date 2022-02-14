/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-10-08
 * Time: 15:25
 * About:
 *
 */
import {FC} from "react"
import {IProgressBar} from './interface'
import classes from './ProgressBar.module.scss'
import LoadingSvg from '../../assets/svg/loading.svg'


const ProgressBar: FC<IProgressBar> = ({fullscreen}) => {



    return <div className={`${classes.ProgressBar} ${fullscreen && classes.fullscreen}`}>
        <LoadingSvg className={classes.icon} />
        </div>
}

export default ProgressBar