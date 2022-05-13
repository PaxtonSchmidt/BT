import react, { Dispatch } from 'react';
import { SetStateAction } from 'react';
import { Container } from 'react-bootstrap';
import { boolean } from 'yup';
import LoginForm from '../../../Library/Forms/LoginForm';

interface Props {
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>
}

export default function LoginPage({ setIsLoggedIn }: Props) {
    return(
        <Container  className='pageBodyContainer3' 
                    style={{width: '100%', 
                        marginBottom: '0px', 
                        textAlign: 'center',
                        paddingTop: '10%'}}
                    >

            <LoginForm setIsLoggedIn={setIsLoggedIn}/>

        </Container>
    )
}