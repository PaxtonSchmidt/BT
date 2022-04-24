import React from 'react';
import HamburgerAndTeam from './HamburgerAndTeam/HamburgerAndTeam';
import BugIcon from './HeaderIcon';
import ProfileAndBell from './ProfileAndBell/ProfileAndBell';

export default function Navbar() {
    return (
        <div className='navBar navComponent'>
            <HamburgerAndTeam />
            <BugIcon />
            <ProfileAndBell />
        </div>
    )
}