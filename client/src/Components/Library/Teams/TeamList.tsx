import React, {useState, Dispatch} from 'react';
import { SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import postSelectTeam from '../../../API/Requests/Login/PostSelectTeam';
import { authService } from '../../../API/Services/AuthService';
import { Team, Teams } from '../../../Redux/interfaces/teams';
import TeamCard from './TeamCard';

interface Props {
    setIsTeamSelected: Dispatch<SetStateAction<boolean>>
}

function TeamList(setIsTeamSelected: Props) {
    let navigate = useNavigate();
    const initial: Team[] = [];
    const teamsState = useSelector((state: Teams) => state.teams)
    let teams = Object.assign(initial, teamsState)

    async function handleSelect(team: string) {
        console.log(await postSelectTeam({team}))
        authService.selectTeam();
        setIsTeamSelected.setIsTeamSelected(true);
        navigate('/dashboard')
    }  

    function handleGoToCreateTeam() {
        navigate('/newTeam')
    }

    const handleOnMouseMove = (e: any) => {
        const {currentTarget: target} = e;
        const rect = target.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;
        target.style.setProperty("--mouse-x", `${x}px`)
        target.style.setProperty("--mouse-y", `${y}px`)
    }
    
    for(const card of document.querySelectorAll<HTMLElement>('.card')) {
        card.onmousemove = (e: any) => handleOnMouseMove(e);
    }

    if(teams && teams.length < 1){
        return (
            <div className='delayedFadeIn'>
                <h1 style={{color: 'white'}}>You don't have any teams</h1>
                <button className='button' onClick={() => handleGoToCreateTeam()}>Create a team</button>
            </div>
        )
    } 
    return (
    <>
        {teams.map((team: any) =>
        <div key={team.team_id} onClick={() => handleSelect(team.team_id)}>
            <TeamCard 
                name={team.team_name}
                ownerName={team.owner_name}
                dateJoined={team.date_joined.slice(0, 10)}
                ownerDiscriminator={team.owner_discriminator}
            />
        </div>
        )}
    </>  
    )
}

    

export default TeamList;
