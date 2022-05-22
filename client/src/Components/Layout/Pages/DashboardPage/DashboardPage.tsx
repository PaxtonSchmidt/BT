import React from 'react';
import { Container } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import LoginForm from '../../../Library/Forms/LoginForm';

interface Props {
    isLoggedIn: boolean;
    isTeamSelected: boolean;
}

export default function DashboardPage({ isLoggedIn, isTeamSelected }: Props) {
    if(isLoggedIn === true){
        if(isTeamSelected === true) {
            return(
                <div className='pageContentContainer'>
                    s
                </div>
            )
        } return <Navigate to='/selectTeam' />
        
    }
    return <Navigate to='/login' />
    

    
    
}