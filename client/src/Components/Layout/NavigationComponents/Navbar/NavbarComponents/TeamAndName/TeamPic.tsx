import React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../../../../../Redux/reducers';

export default function Team() {
    const sessionState = useSelector((state: State) => state.session)
    
    let TeamName = sessionState.currentTeam?.name
    return(
        <>
            <h3 className='delayedFadeIn' style={{color: 'white', whiteSpace: 'nowrap', textAlign: 'left', marginLeft: '10px', fontWeight: 'lighter', cursor: 'default'}}>{TeamName}</h3>
        </>
    )
}