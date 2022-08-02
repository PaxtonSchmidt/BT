import React, { SetStateAction } from 'react';
import cheeburger from '../../Images/Icons/list.svg';

interface Props{
    setIsSideBarExpanded: React.Dispatch<React.SetStateAction<boolean>>,
    isSideBarExpanded: boolean
}

export default function Hamburger(props: Props) {
    function handleSetIsSideBarExpanded(){
        let isExtended = !props.isSideBarExpanded
        window.localStorage.setItem("sbEX", isExtended.toString())
        props.setIsSideBarExpanded(!props.isSideBarExpanded)
    }
    return(
        <div className='hamburgerContainer fadeIn scaleYonHover' onClick={()=>handleSetIsSideBarExpanded()}>
            <img src={cheeburger} alt='open navigation menu' className='hamburger longFadeIn' />
        </div> 
    )
}