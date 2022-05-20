import react, { Dispatch, useEffect } from 'react';
import { SetStateAction } from 'react';
import { Container } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import { authService } from '../../../../API/Services/AuthService';
import TeamList from '../../../Library/Teams/TeamList';

interface Props {
    isLoggedIn: boolean;
    setIsTeamSelected: Dispatch<SetStateAction<boolean>>
}

export default function SelectTeamPage({ setIsTeamSelected, isLoggedIn }: Props) {
    // useEffect(() => {
    //     setIsTeamSelected(false); 
    //     authService.deselectTeam()}
    // , [])

    if(isLoggedIn === true) {
        return(
            <div className='pageContentContainer'>
                <div className='pageHeaderContainer'>
                    <h1 style={{color: 'white'}}>Which team would you like to work for?</h1>
                    <TeamList setIsTeamSelected={setIsTeamSelected} />
                </div>
            </div>
        )
    }
    return <Navigate to='/login' />
}