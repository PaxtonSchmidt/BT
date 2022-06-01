import React, {useState, useEffect, Dispatch} from 'react';
import { SetStateAction } from 'react';
import postSelectTeam from '../../../API/Requests/Login/PostSelectTeam';
import TeamCard from './TeamCard';

interface Props {
    setIsTeamSelected: Dispatch<SetStateAction<boolean>>
}

function TeamList(setIsTeamSelected: Props) {
    const [teams, setTeams] = useState<any[]>([]);

    useEffect(() => {
        fetch('/teams/getTeams')
        .then((res => {
            if(res.ok) {         
                return res.json();
            } else if(res.status === 400){
                window.location.assign('/login')
            }
                else {
                console.log('couldnt get teams')
                return res.json();
            }
        }))
        .then(jsonRes => setTeams(jsonRes));
    }, [])  

    function handleSelect(team: string) {
        postSelectTeam({team})
        setIsTeamSelected.setIsTeamSelected(true);
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
 
    return (
    <>
        {teams.map((team) =>
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
