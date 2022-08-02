import React, { Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Invite } from '../../ComponentInterfaces/invite';
import { AlertActionCreators, InvitesActionCreators } from '../../../Redux';
import { Invites } from '../../../Redux/interfaces/invites';
import InviteCard  from './InviteCard';

function InviteList() {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { updateInvites } = bindActionCreators(InvitesActionCreators, dispatch)
    const { fireAlert, hideAlert } = bindActionCreators(AlertActionCreators, dispatch)
    const initial: any = [];
    const invitesState = useSelector((state: Invites) => state.invites)
    let invites = Object.assign(initial, invitesState)

    function handleGoToTeamSelect(){
        navigate('/selectTeam')
    }
    function handleGoToCreateATeam(){
        navigate('/newTeam')
    }

    async function handleRefresh() {
        let response = await fetch('/teams/getTeamInvites', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(r =>  r.json().then(data => ({status: r.status, body: data})))
        
        if(response.status === 200) {         
            return updateInvites(response.body);
        } else if(response.status === 404){
            return []
        } else{
            fireAlert({
                isOpen: true,
                status: response.status,
                message: response.body.message
            })
            return setTimeout(hideAlert, 6000)
        }
    }

    if(invites.length < 1){
        return (
            <>
                <h1 className='delayedFadeIn' style={{color: 'white'}}>Looks like you don't have any invites...</h1>
                <button className='onClick delayedFadeIn' onClick={handleRefresh}>Refresh</button>
                <button className='onClick delayedFadeIn' onClick={handleGoToTeamSelect}>Choose team</button>
                <button className='onClick delayedFadeIn' onClick={handleGoToCreateATeam}>Create team</button>
            </>
        )
    } else {
        return (
            <>
                <h1 className='fadeIn' style={{color: 'white', textAlign: 'left', fontWeight: 'bold', paddingLeft: '10px'}}>
                    Your Invites
                </h1>
                {invites.map((invite: Invite) =>
                <div key={invite.invite_id}>
                    <InviteCard 
                        invite_id={invite.invite_id}
                        team_name={invite.team_name}
                        sender_name={invite.sender_name}
                        sender_discriminator={invite.sender_discriminator}
                        date_sent={invite.date_sent.slice(0, 10)}
                    />
                </div>
                )}
            </>  
            )
    }
}
    

export default InviteList;
