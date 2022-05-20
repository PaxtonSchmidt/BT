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
        <div className='listItem' onClick={handleClick}>
            <span className='listColumnNames'>
                {props.name}
            </span>
            <span className='listColumnNames'>
                {props.dateJoined}
            </span>
            <span className='listColumnNames'>
                {props.ownerName}
            </span>
        </div>
    )
}