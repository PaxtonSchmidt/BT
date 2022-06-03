import react, { Dispatch, useEffect } from 'react';
import { SetStateAction } from 'react';
import { Container } from 'react-bootstrap';
import { boolean } from 'yup';
import { authService } from '../../../../API/Services/AuthService';
import LoginForm from '../../../Library/Forms/LoginForm';


export default function LoginPage() {
    //if(isLoggedIn)return(<h1>we have you logged in</h1><button>log out?</button>) else {->}
    useEffect(() => { 
        authService.signOut()
        authService.deselectTeam()}
    , [])

    
    return(
        <Container  className='loginPage' >
            <LoginForm />
        </Container>
    )
}