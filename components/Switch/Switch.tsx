/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-11-15
 * Time: 11:27
 * About:
 *
 */
import {FC} from "react"
import {ISwitch} from './interface'
import classes from './Switch.module.scss'


const Switch: FC<ISwitch> = ({
                                 lableOn,
                                 lableOff,
                                 toggle,
                                 callback
}) => {

    const handleClick = () => callback(true)


    return <div className={classes.Switch} onClick={handleClick}>
        <div className={`${classes.one} ${toggle ? classes.off : classes.on}`}>{lableOn}</div>
        <div className={`${classes.two} ${toggle ? classes.on : classes.off}`}>{lableOff}</div>
           </div>
}

export default Switch