import react, { Dispatch, useEffect } from 'react';
import { SetStateAction } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { authService } from '../../../../API/Services/AuthService';
import { State } from '../../../../Redux/reducers';
import TeamList from '../../../Library/Teams/TeamList';

interface Props {
    setIsTeamSelected: Dispatch<SetStateAction<boolean>>
}

export default function SelectTeamPage({ setIsTeamSelected }: Props) {
    const loginState = useSelector((state: State) => state.login)

    
    
    if(loginState === 1) {
        return(
            <div className='teamCardPageBody'>
                <div id='cards'>
                    <TeamList setIsTeamSelected={setIsTeamSelected} />
                </div>
            </div>
        )
    }
    return <Navigate to='/login' />
}