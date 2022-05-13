import React from 'react';
import { Container } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import LoginForm from '../../../Library/Forms/LoginForm';

interface Props {
    isAuth: boolean;
}

export default function DashboardPage(isAuth: Props) {
    if(isAuth.isAuth === true){
        return(
            <div className='pageContentContainer'>
                <div className='pageHeaderContainer'>
                    <h1 className='pageHeader'>DASHBOARD</h1>
                </div>      
            </div>
        )
    }
    return <Navigate to='/login' />
    

    
    
}