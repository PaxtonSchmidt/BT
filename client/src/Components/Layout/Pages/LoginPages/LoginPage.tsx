import react, { Dispatch, useEffect } from 'react';
import { SetStateAction } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import postInvalidateJWT from '../../../../API/Requests/Login/PostInvalidateJWT';
import { authService } from '../../../../API/Services/AuthService';
import { InvitesActionCreators, LoginActionCreators, TeamsActionCreators } from '../../../../Redux';
import LoginForm from '../../../Library/Forms/LoginForm';


export default function LoginPage() {
    let dispatch = useDispatch();
    const { logout } = bindActionCreators(LoginActionCreators, dispatch)
    const { updateTeams } = bindActionCreators(TeamsActionCreators, dispatch)
    const { updateInvites } = bindActionCreators(InvitesActionCreators, dispatch)

    useEffect(() => { 
        //this way you cant spam for new tokens 
        let isLoggedIn = window.sessionStorage.getItem('isLoggedIn')
        if(isLoggedIn === 'true'){
            postInvalidateJWT();
        }
        let teams: any = []
        let invites: any = []
        updateTeams({teams})
        updateInvites({invites})
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
