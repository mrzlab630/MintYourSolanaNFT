/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2022-01-19
 * Time: 17:40
 * About:
 *
 */
import React, {FC,useState,useRef,useEffect} from "react"
import {ISelect} from './interface'
import classes from './Select.module.scss'
import SortDown from '../../assets/svg/sort-down.svg'


const Select: FC<ISelect> = ({
                                defaultValue,
                                width,
                                list,
                                callback
}) => {

    const ref = useRef<HTMLHeadingElement>(null)

    const [toggleMenu, setToggleMenu] = useState<boolean>(false)

    const [selectItm, setSelectItm] = useState<string|undefined>(undefined)


    useEffect(() =>{

        if(defaultValue){
            setSelectItm(defaultValue)
        }

    },[defaultValue])

    useEffect(() => {
        const checkIfClickedOutside = (e:MouseEvent) => {
            if (toggleMenu && ref?.current && !ref.current.contains(e.target  as Node)) {
                setToggleMenu(false)
            }
        }

        document.addEventListener("mousedown", checkIfClickedOutside)

        return () =>   document.removeEventListener("mousedown", checkIfClickedOutside)

    }, [toggleMenu])


    const handleClickWrap = () => setToggleMenu(prev => !prev)

    const handleClickItm = (v:string) => () => {
        setSelectItm(v)
        setToggleMenu(prev => !prev)

        if(typeof callback === "function"){
            callback(v)
        }

    }


    const renderItms = list.map((itm,idx) =>  <div
                                                    key={`renderItms-${idx}`}
                                                    onClick={handleClickItm(itm)}
                                                   className={`${classes.itm} ${selectItm === itm ? classes.selectedItm : classes.notSelectedItm}`}
                                                    ><span>{itm}</span></div>)

    return <div
        style={
            width ? {width} : undefined
        }
        className={classes.Select}
        ref={ref}
    >

        <div onClick={handleClickWrap} className={classes.wrap}>

            <div className={classes.lable} ><span className={`${selectItm ? classes.selectColor : classes.notSelectColor}`}>{selectItm ?? 'select'}</span></div>

            <div className={classes.separatorVer}/>

            <div className={`${classes.sortIndicator} ${toggleMenu ? classes.tglIcon : ''}`}>
                <SortDown className={classes.sortIcon} />
            </div>

        </div>

        {
            toggleMenu && <div className={classes.menu}>{renderItms}</div>
        }
    </div>
}

export default Select