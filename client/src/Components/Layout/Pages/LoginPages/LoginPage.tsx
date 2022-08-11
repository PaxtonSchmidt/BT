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
  const { logout } = bindActionCreators(LoginActionCreators, dispatch);
  

  useEffect(() => {
    //this way you cant spam for new tokens
    let isLoggedIn = window.sessionStorage.getItem('isLoggedIn');
    let isDemo = window.sessionStorage.getItem('isDemo') === 'true'
    if (isLoggedIn !== undefined && isLoggedIn === 'true') {
      postInvalidateJWT();
      if(isDemo === true){sessionStorage.setItem('isDemo', 'false')}
      window.location.reload();
    }
    logout();
    authService.signOut();
    authService.deselectTeam();
  }, []);

  return (
    <Container className='loginPage'>
      <LoginForm />
    </Container>
  );
}
