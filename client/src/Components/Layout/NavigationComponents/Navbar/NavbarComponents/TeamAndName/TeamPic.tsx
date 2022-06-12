import React from 'react';
import { useSelector } from 'react-redux';
import TranslateTeamRole from '../../../../../../Services/RoleTranslator';
import { State } from '../../../../../../Redux/reducers';

export default function Team() {
    const sessionState = useSelector((state: State) => state.session)
    console.log(sessionState)
    let TeamName = sessionState.currentTeam?.name
    return(
        <>
            <h3 className='delayedFadeIn' style={{color: 'white', whiteSpace: 'nowrap', textAlign: 'left', marginLeft: '10px', fontWeight: 'lighter'}}>{TeamName}</h3>
        </>
    )
}