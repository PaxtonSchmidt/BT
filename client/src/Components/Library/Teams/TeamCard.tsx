import React, { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../../API/Services/AuthService';
import { Team } from '../../../PropsInterfaces/team';

export default function TeamCard(props : Team) {   
    let navigate = useNavigate();
    
    async function handleClick() {
        authService.selectTeam();
        console.log(props.name)
        navigate('/dashboard');
    }
    
    return(
        <div className='card'  onClick={handleClick}>
            <div className='cardContent' style={{color: 'white'}}>
                <div style={{fontSize: '18px'}}>
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