/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-09-21
 * Time: 11:02
 * About:
 *
 */
import {FC} from "react"
import {ITooltip} from './interface'
import classes from './Tooltip.module.scss'


const Tooltip: FC<ITooltip> = ({
                                   children,
                                   title,
                                   position}) => {

    return <div className={classes.Tooltip}>
        {children}
        <div className={`${classes.tooltiptext} ${position ? classes[position] : classes.top}`}>
            {title}
        </div>
    </div>
}

export default Tooltip