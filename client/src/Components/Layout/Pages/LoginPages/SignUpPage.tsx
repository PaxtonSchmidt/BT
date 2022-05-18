import react, { Dispatch } from 'react';
import { SetStateAction } from 'react';
import { Container } from 'react-bootstrap';
import { boolean } from 'yup';
import LoginForm from '../../../Library/Forms/LoginForm';
import SignUpForm from '../../../Library/Forms/SignUpForm';



export default function SignUpPage() {
    return(
        <Container  className='pageBodyContainer3' 
                    style={{width: '100%',
                        marginTop: '15%',
                        marginBottom: 'auto',
                        alignItems: 'center',
                        textAlign: 'center'}}
                    >

            <SignUpForm />

        </Container>
    )
}