import react, { Dispatch } from 'react';
import { SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { State } from '../../../../Redux/reducers';
import SelectTeamPageButtons from '../../../Library/Buttons/buttonsDesktop';
import TeamList from '../../../Library/Teams/TeamList';

interface Props {
    setIsTeamSelected: Dispatch<SetStateAction<boolean>>
}

// function decideButtons() {
//     if(window.innerWidth > 720){
//         return <ButtonsDesktop />
//     } else {
//         return <ButtonsModile />
//     }
// }


export default function SelectTeamPage({ setIsTeamSelected }: Props) {
    const loginState = useSelector((state: State) => state.login)
    
    if(loginState === 1) {
        return(
            <div className='teamCardPageBody altBG'>
                <SelectTeamPageButtons />
                <div id='cards'>                 
                    <TeamList setIsTeamSelected={setIsTeamSelected} />
                </div>
            </div>
        )
    }
    return <Navigate to='/login' />
}