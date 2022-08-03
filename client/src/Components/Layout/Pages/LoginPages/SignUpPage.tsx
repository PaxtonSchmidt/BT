import react, { Dispatch, useEffect } from 'react';
import { SetStateAction } from 'react';
import { Container } from 'react-bootstrap';
import { boolean } from 'yup';
import { authService } from '../../../../Services/AuthService';
import LoginForm from '../../../Library/Forms/LoginForm';
import SignUpForm from '../../../Library/Forms/SignUpForm';

export default function SignUpPage() {
  useEffect(() => {
    authService.signOut();
    authService.deselectTeam();
  }, []);
  return (
    <Container className='loginPage'>
      <SignUpForm />
    </Container>
  );
}
