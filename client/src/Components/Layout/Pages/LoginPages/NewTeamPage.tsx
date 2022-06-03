import react, { Dispatch } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { State } from '../../../../Redux/reducers';
import SelectTeamPageButtons from '../../../Library/Buttons/buttonsDesktop';
import NewTeamForm from '../../../Library/Forms/NewTeamForm';

export default function NewTeamPage() {
    const loginState = useSelector((state: State) => state.login)

    if(loginState === 1) {
        return(
            <Container  className='loginPage altBG '>
                <SelectTeamPageButtons />
                <NewTeamForm />
            </Container>
        )
    } else {
        return <Navigate to='../login' />
    }
}