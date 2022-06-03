import react, { Dispatch, useState } from 'react';
import { useEffect } from 'react';
import { SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { TeamsActionCreators } from '../../../../Redux';
import { State } from '../../../../Redux/reducers';
import SelectTeamPageButtons from '../../../Library/Buttons/buttonsDesktop';
import TeamList from '../../../Library/Teams/TeamList';

interface Props {
    setIsTeamSelected: Dispatch<SetStateAction<boolean>>
}

export default function SelectTeamPage({ setIsTeamSelected }: Props) {
    const dispatch = useDispatch();
    const { updateTeams } = bindActionCreators(TeamsActionCreators, dispatch)
    const loginState = useSelector((state: State) => state.login)
    let [isBusy, setBusy] = useState(true)

    useEffect(() => {
    fetch('/teams/getTeams')
    .then((res => {
        if(res.ok) {  
            console.log('a')       
            return res.json();
        } else if(res.status === 400){
            console.log('a')
            return window.location.assign('/login')
        } else if(res.status === 404){
            return []
        } else{
            return console.log('Something went wrong')
        }
    }))
        .then(jsonRes =>{setBusy(false); return updateTeams(jsonRes)});
    }, []) 

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