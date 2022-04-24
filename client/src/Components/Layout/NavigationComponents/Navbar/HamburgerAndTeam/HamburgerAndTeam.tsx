import React from 'react';
import Hamburger from './Hamburger';
import TeamPic from './TeamPic';

export default function HamburgerAndTeam() {
    
    return(
        <div className='navComponent' style={{marginLeft: '3px'}}>
            <Hamburger />
            <TeamPic />
        </div>
    )
}