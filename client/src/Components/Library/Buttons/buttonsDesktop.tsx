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
                return '';
            } else{
                return console.log('something went wrong...')
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
        authService.signOut()
        navigate('/login')
        window.location.reload();
        
    }
    function handleCreateTeam(){
        navigate('/newTeam')
    }
    function handleCheckInvites(){
        navigate('/teamInvites')
    }
    function handleChooseTeam(){
        navigate('/selectTeam')
    }
    
    return(
        <>
            <button className='selectTeamPageNavbutton glowsToo' style={{bottom: '10px', position: 'absolute'}} onClick={handleLogout}>Logout</button>

            <span  className='selectTeamPageNavContainer' style={{bottom: '30px', position: 'absolute'}}>
                <span>
                    <button className='selectTeamPageNavbutton glowsToo' style={{paddingRight:'0px'}} onClick={handleCreateTeam} >Create</button>
                </span>
                <span className='selectTeamPageNavbuttonExtra'>
                    /
                </span>
                <span>
                    <button className='selectTeamPageNavbutton glowsToo' style={{paddingLeft:'0px'}}  onClick={handleChooseTeam}>Choose</button>
                </span>
                <span className='selectTeamPageNavbuttonExtra glowsToo'>
                    a team
                </span>
            </span>

            <button className='selectTeamPageNavbutton ' style={{bottom: '50px', position: 'absolute'}} onClick={handleCheckInvites}>
                <span className='invitesNum'>{inviteAmount}</span><span className='glowsToo'>{plurality}</span>
            </button>
        </>
    )

}