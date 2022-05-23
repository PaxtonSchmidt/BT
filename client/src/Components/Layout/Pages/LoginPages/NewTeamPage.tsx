import react, { Dispatch } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { State } from '../../../../Redux/reducers';
import NewTeamForm from '../../../Library/Forms/NewTeamForm';

export default function NewTeamPage() {
    const loginState = useSelector((state: State) => state.login)

    if(loginState === 1) {
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