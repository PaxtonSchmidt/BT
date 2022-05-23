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
    console.log(loginState)
    

    if(loginState === 1) {
        return(
            <div className='pageBodyContainer3' 
                style={{width: '100vw',  
                textAlign: 'center',
                marginTop: '15%',
                marginBottom: 'auto', 
                flexDirection:'column', 
                flexWrap: 'wrap'}}>

                <h1 style={{color: 'white'}}>Which team would you like to work for?</h1>
                <TeamList setIsTeamSelected={setIsTeamSelected} />
            </div>
        )
    }
    return <Navigate to='/login' />
}