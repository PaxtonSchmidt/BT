import react, { Dispatch } from 'react';
import { Container } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import NewTeamForm from '../../../Library/Forms/NewTeamForm';

export default function NewTeamPage() {
    if(1 === 1) {
        return(
            <Container  className='pageBodyContainer3' 
                        style={{width: '100vw',
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