import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { authService } from '../../../API/Services/AuthService';
import { Invites } from '../../../Redux/interfaces/invites';
import { InvitesActionCreators } from '../../../Redux';

export default function SelectTeamPageButtons(){
    const invitesState = useSelector((state: Invites) => state.invites)
    const dispatch = useDispatch();
    const { update } = bindActionCreators(InvitesActionCreators, dispatch)
    let navigate = useNavigate();

    useEffect(() => {
        fetch('/teams/getTeamInvites')
        .then((res => {
            if(res.ok) {         
                return res.json();
            } else if(res.status === 404){
                return res.json()
            } 
        }))
        .then(jsonRes => update(jsonRes));
    }, [])  

    let inviteAmount = invitesState.length;

    let plurality = isPlural(invitesState.length);
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
                <span className='invitesNum'>{inviteAmount}</span>{plurality}
            </button>
        </>
    )

}