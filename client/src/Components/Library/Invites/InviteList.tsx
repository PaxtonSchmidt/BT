import React, { Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Invite } from '../../../PropsInterfaces/invite';
import { InvitesActionCreators } from '../../../Redux';
import { Invites } from '../../../Redux/interfaces/invites';
import InviteCard  from './InviteCard';

function InviteList() {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { update } = bindActionCreators(InvitesActionCreators, dispatch)
    const initial: any = [];
    const invitesState = useSelector((state: Invites) => state.invites)
    let invites = Object.assign(initial, invitesState)

    function handleGoToTeamSelect(){
        navigate('/selectTeam')
    }

    function handleRefresh() {
        fetch('/teams/getTeamInvites')
        .then((res => {
            if(res.ok) {         
                return res.json();
            } else if(res.status === 404){
                return console.log('No invites')
            } else{
                return console.log('something went wrong...')
            }
        }))
        .then(jsonRes => update(jsonRes));
    }

    const handleOnMouseMove = (e: any) => {
        const {currentTarget: target} = e;

        const rect = target.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;

        target.style.setProperty("--mouse-x", `${x}px`)
        target.style.setProperty("--mouse-y", `${y}px`)
    }

    for(const card of document.querySelectorAll<HTMLElement>('.card')) {
        card.onmousemove = (e: any) => handleOnMouseMove(e);
    }
 
    if(invites.length === 0){
        return (
            <>
                <h1 style={{color: 'white'}}>Looks like you don't have any invites...</h1>
                <button className='onClick' onClick={handleRefresh}>Refresh</button>
                <button className='onClick' onClick={handleGoToTeamSelect}>Choose a team</button>
            </>
        )
    } else {
        return (
            <>
                <h1 style={{color: 'white', textAlign: 'left', fontWeight: 'bold', paddingLeft: '10px', opacity: '50%'}}>
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
