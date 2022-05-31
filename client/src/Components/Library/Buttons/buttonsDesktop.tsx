import e from 'express';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../../API/Services/AuthService';

export default function SelectTeamPageButtons(){
    let navigate = useNavigate();
    let invites = '4';
    let plurality = isPlural(invites);
    //get the amount of team invites the user has from invite store
    function isPlural(invites: any){
        if(invites === '1'){
            let plurality = ' Team Invite'
            return plurality
        }else{
            let plurality = ' Team Invites'
            return plurality
        }
    }

    function handleLogout(){
        navigate('/login')
        authService.signOut()
    }
    function handleCreateTeam(){
        navigate('/newTeam')
    }
    function handleCheckInvites(){
        //open invite list modal
    }
    
    return(
        <>
            <button className='selectTeamPageNavbutton' onClick={handleLogout}>Logout</button>
            <button className='selectTeamPageNavbutton' style={{bottom: '30px'}} onClick={handleCreateTeam}>Create a Team</button>
            <button className='selectTeamPageNavbutton' style={{bottom: '50px'}} onClick={handleCheckInvites}>
                <span className='invitesNum'>{invites}</span>
                {plurality}</button>
        </>
    )

}