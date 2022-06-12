import react, { Dispatch, useEffect } from 'react';
import { SetStateAction } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import postInvalidateJWT from '../../../../API/Requests/Login/PostInvalidateJWT';
import { authService } from '../../../../Services/AuthService';
import { LoginActionCreators } from '../../../../Redux';
import LoginForm from '../../../Library/Forms/LoginForm';


export default function LoginPage() {
    let dispatch = useDispatch();
    const { logout } = bindActionCreators(LoginActionCreators, dispatch)

    useEffect(() => { 
        //this way you cant spam for new tokens 
        let isLoggedIn = window.sessionStorage.getItem('isLoggedIn')
        if(isLoggedIn !== undefined && isLoggedIn === 'true'){
            console.log('g')
            postInvalidateJWT();
            window.location.reload();
        }
        logout(); 
        authService.signOut()
        authService.deselectTeam()
        }
    , [])

    
    return(
        <Container  className='loginPage' >
            <LoginForm />
        </Container>
    )
}
