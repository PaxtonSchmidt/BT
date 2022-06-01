import React, { Dispatch, SetStateAction } from 'react';
import { Invite } from '../../../PropsInterfaces/invite';
import deleteInvite from '../../../API/Requests/Invites/DeleteInvite'
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { InvitesActionCreators } from '../../../Redux';
import { AnyMessageParams } from 'yup/lib/types';
import postAcceptInvite from '../../../API/Requests/Invites/PostAcceptInvite';

export default function InviteCard(props : Invite) {   
    const dispatch = useDispatch();
    const { remove } = bindActionCreators(InvitesActionCreators, dispatch)

    async function handleAcceptInvite(invite_id: any, team_name: any){
        if(await postAcceptInvite(invite_id) === 200){
            console.log(`You joined ${team_name}`)
        } else{
            console.log('Could not accept invite...')
        }
    }
    async function handleDeleteInvite(invite_id: any){
        console.log(invite_id)
        if(await deleteInvite(invite_id) === 200){
            remove(invite_id);
        } else{
            return console.log('Could not delete invite...')
        }
    }
    return(
        <div className='card'>
            <div className='cardContent' style={{color: 'white', fontWeight: 'bold'}}>
                <div className='cardTeamName' >
                    {props.team_name}
                </div>
                <div className='cardTeamOwner'>
                    <span className='cardTeamOwnerName'>
                        {props.sender_name}#{props.sender_discriminator}
                    </span>
                </div>
                <button className='cardButton decline' onClick={()=>handleDeleteInvite(props.invite_id)}>Decline</button>
                <button className='cardButton' style={{backgroundColor: 'green'}} onClick={()=>handleAcceptInvite(props.invite_id, props.team_name)}>Accept</button>
            </div>
        </div>
    )
}