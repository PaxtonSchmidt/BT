import React from 'react';
import NotiBell from './NotificationBell';
import ProfilePic from './ProfilePic';

export default function ProfileAndBell() {
    
    return(
        <div className='navComponent' style={{marginRight: '10px'}}>
            <NotiBell />
            <ProfilePic />
        </div>
    )
}