import react, { Dispatch, useEffect } from 'react';
import { SetStateAction } from 'react';
import { Container } from 'react-bootstrap';
import { boolean } from 'yup';
import { authService } from '../../../../API/Services/AuthService';
import LoginForm from '../../../Library/Forms/LoginForm';
import SignUpForm from '../../../Library/Forms/SignUpForm';



export default function SignUpPage() {
    useEffect(() => { 
        authService.signOut()
        authService.deselectTeam()}
    , [])
    return(
        <Container  className='pageBodyContainer3' 
                    style={{width: '100vw',
                        marginTop: '15%',
                        marginBottom: 'auto',
                        alignItems: 'center',
                        textAlign: 'center'}}
                    >

            <SignUpForm />

        </Container>
    )
}