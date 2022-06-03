import React from 'react';
import TeamPic from './NavbarComponents/TeamPic';
import BugIcon from './NavbarComponents/HeaderIcon';
import ProfileAndBell from './NavbarComponents/ProfileAndBell/ProfileAndBell';

export default function Navbar() {
    return (
        <div className='navBar navComponent fadeIn'>
            <TeamPic />
            <ProfileAndBell />
        </div>
    )
}