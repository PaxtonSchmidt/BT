import React, {useState, useEffect, Dispatch} from 'react';
import { SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import postSelectTeam from '../../../API/Requests/Login/PostSelectTeam';
import TeamCard from './TeamCard';

interface Props {
    setIsTeamSelected: Dispatch<SetStateAction<boolean>>
}

function TeamList(setIsTeamSelected: Props) {
    let navigate = useNavigate();
    const [teams, setTeams] = useState<any[]>([]);

    useEffect(() => {
        fetch('/teams/getTeams')
        .then((res => {
            if(res.ok) {         
                return res.json();
            } else if(res.status === 400){
                window.location.assign('/login')
            } else if(res.status === 404){
                return ''
            } else{
                return console.log('Something went wrong')
            }
        }))
        .then(jsonRes =>{setTeams(jsonRes)});
    }, [])  

    async function handleSelect(team: string) {
        console.log(await postSelectTeam({team}))
        setIsTeamSelected.setIsTeamSelected(true);
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
 
    if(teams.length < 1){
        return (
            <>
            <h1></h1>
            <h1 style={{color: 'white'}}>You don't have any teams</h1>
            <button className='button' onClick={() => handleGoToCreateTeam()}>Create a team</button>
            </>
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
