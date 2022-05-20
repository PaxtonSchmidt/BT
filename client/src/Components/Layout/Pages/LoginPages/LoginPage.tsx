import react, { Dispatch, useEffect } from 'react';
import { SetStateAction } from 'react';
import { Container } from 'react-bootstrap';
import { boolean } from 'yup';
import { authService } from '../../../../API/Services/AuthService';
import LoginForm from '../../../Library/Forms/LoginForm';

interface Props {
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>
}

export default function LoginPage({ setIsLoggedIn }: Props) {
    //if(isLoggedIn)return(<h1>we have you logged in</h1><button>log out?</button>) else {->}
    useEffect(() => {
        setIsLoggedIn(false); 
        authService.signOut()}
    , [])
    return(
        <Container  className='pageBodyContainer3' 
                    style={{width: '100%',  
                        textAlign: 'center',
                        marginTop: '15%',
                        marginBottom: 'auto'}}
                    >

            <LoginForm setIsLoggedIn={setIsLoggedIn}/>

        </Container>
    )
}