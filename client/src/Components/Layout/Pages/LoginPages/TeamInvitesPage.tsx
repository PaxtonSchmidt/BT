import react, { Dispatch } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { State } from '../../../../Redux/reducers';
import SelectTeamPageButtons from '../../../Library/Buttons/buttonsDesktop';
import InviteList from '../../../Library/Invites/InviteList';

export default function TeamInvitesPage() {
    const loginState = useSelector((state: State) => state.login)

    if(loginState === 1) {
        return(
            <div className='teamCardPageBody altBG'>
                <SelectTeamPageButtons />
                <div id='cards'>   
                    <InviteList />              
                </div>
            </div>
        )
    } else {
        return <Navigate to='../login' />
    }
}