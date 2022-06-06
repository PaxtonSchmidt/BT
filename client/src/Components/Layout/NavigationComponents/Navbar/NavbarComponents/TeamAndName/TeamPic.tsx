import React from 'react';
import { useSelector } from 'react-redux';
import TranslateTeamRole from '../../../../../../API/Services/RoleTranslator';
import { State } from '../../../../../../Redux/reducers';

export default function Team() {
    const sessionState = useSelector((state: State) => state.session)
    let TeamName = sessionState.currentTeam?.name
    return(
        <>
            <div className='navItem circleIcon navPicture teamPic longFadeIn'></div>
            <h2 style={{color: 'white', whiteSpace: 'nowrap', textAlign: 'center'}}>{TeamName}</h2>
        </>
    )
}