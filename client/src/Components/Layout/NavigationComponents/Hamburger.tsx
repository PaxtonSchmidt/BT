import React from 'react';
import cheeburger from '../../Images/Icons/list.svg';

export default function Hamburger() {
    
    return(
        <div className='hamburgerContainer'>
            <img src={cheeburger} alt='open navigation menu' className='hamburger scaleYonHover' />
        </div> 
    )
}