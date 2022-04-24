import React from 'react';
import cheeburger from '../../../../Images/Icons/list.svg'

export default function Hamburger() {
    
    return(
        <div className='outerNavElement'>
            <div className='circleIcon'>
                <img src={cheeburger} alt='open navigation menu' className='hamburger' />
            </div>
        </div>
        
    )
}