import React, { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../../Services/AuthService';
import { Team } from '../../PropsInterfaces/team';

export default function TeamCard(props : Team) {   

    return( 
        <div className='card fadeIn' >
            <div className='cardContent' style={{color: 'white', fontWeight: 'bold'}}>
                <div style={{fontSize: '18px', whiteSpace: 'nowrap', marginLeft: '10px'}}>
                    {props.name}
                </div>
                <div className='cardTeamOwner'>
                    <span className='cardTeamOwnerName'>
                        {props.ownerName} #{props.ownerDiscriminator}
                    </span>
                </div>
            </div>
        </div>
    )
}