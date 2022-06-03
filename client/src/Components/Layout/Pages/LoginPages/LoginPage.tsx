import react, { Dispatch, useEffect } from 'react';
import { SetStateAction } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authService } from '../../../../API/Services/AuthService';
import { LoginActionCreators } from '../../../../Redux';
import LoginForm from '../../../Library/Forms/LoginForm';


export default function LoginPage() {
    let dispatch = useDispatch();
    const { logout } = bindActionCreators(LoginActionCreators, dispatch)


    useEffect(() => { 
        logout();
        authService.signOut()
        authService.deselectTeam()}
    , [])

    
    return(
        <Container  className='loginPage' >
            <LoginForm />
        </Container>
    )
}