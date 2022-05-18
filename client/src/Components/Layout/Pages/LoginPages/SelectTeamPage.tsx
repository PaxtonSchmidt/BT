import react, { Dispatch } from 'react';
import { SetStateAction } from 'react';
import { Container } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import { boolean } from 'yup';
import { authService } from '../../../../API/Services/AuthService';
import TeamList from '../../../Library/Teams/TeamList';

interface Props {
    isLoggedIn: boolean;
    setIsTeamSelected: Dispatch<SetStateAction<boolean>>
}

export default function SelectTeamPage({ setIsTeamSelected, isLoggedIn }: Props) {
    const navigate = useNavigate(); 

    const handleTeamSelect = () => {
        setIsTeamSelected(true);
        authService.selectTeam();
        navigate('../dashboard');
    }

    if(isLoggedIn === true) {
        return(
            <div className='pageContentContainer'>
                <div className='pageHeaderContainer'>
                    <h1 style={{color: 'white'}}>Which team would you like to work for?</h1>
                    <Container className='pageBodyContainer3'>
                        <TeamList />
                    </Container>
                </div>
            </div>
        )
    }
    return <Navigate to='/login' />
}