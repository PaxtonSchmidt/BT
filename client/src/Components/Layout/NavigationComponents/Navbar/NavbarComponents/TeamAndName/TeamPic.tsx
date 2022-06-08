import React from 'react';
import { useSelector } from 'react-redux';
import TranslateTeamRole from '../../../../../../API/Services/RoleTranslator';
import { State } from '../../../../../../Redux/reducers';

export default function Team() {
    const sessionState = useSelector((state: State) => state.session)
    let TeamName = sessionState.currentTeam?.name
    return(
        <>
            <h3 className='delayedFadeIn' style={{color: 'white', whiteSpace: 'nowrap', textAlign: 'left', marginLeft: '10px', fontWeight: 'lighter'}}>{TeamName}</h3>
        </>
    )
}