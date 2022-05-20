import react, { Dispatch } from 'react';
import { Container } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import NewTeamForm from '../../../Library/Forms/NewTeamForm';

interface Props {
    isLoggedIn: boolean;
}

export default function NewTeamPage(isLoggedIn: Props) {
    if(isLoggedIn.isLoggedIn) {
        return(
            <Container  className='pageBodyContainer3' 
                        style={{width: '100%',
                            marginTop: '15%',
                            marginBottom: 'auto',
                            alignItems: 'center',
                            textAlign: 'center'}}
                        >

                <NewTeamForm />
                
            </Container>
        )
    } else {
        return <Navigate to='../login' />
    }
}