import React from 'react';
import { Container } from 'react-bootstrap';
import LoginForm from '../../../Library/Forms/LoginForm';
export default function DashboardPage() {
    return(
        <div className='pageContentContainer'>
            <div className='pageHeaderContainer'>
                <h1 className='pageHeader'>DASHBOARD</h1>
            </div>
            <Container className='pageBodyContainer3'>
                <LoginForm />
            </Container>
                
        </div>
    )
}