import React, {useState, useEffect, Dispatch} from 'react';
import { SetStateAction } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import TeamCard from './TeamCard';

interface Props {
    setIsTeamSelected: Dispatch<SetStateAction<boolean>>
}

function TeamList(setIsTeamSelected: Props) {
    const [teams, setTeams] = useState<any[]>([]);
    let navigate = useNavigate();

    useEffect(() => {
        fetch('/teams/getTeams')
        .then((res => {
            if(res.ok) {         
                console.log('a') 
                return res.json();
            } else {
                console.log('b')
                return res.json();
            }
        }))
        .then(jsonRes => setTeams(jsonRes));
    }, [])  

     //needs pagination
    return (
    <Container className='pageBodyContainer3'>
        <div className='list' style={{textAlign: 'left', height: 'fit-content', width: '50%'}}>
            {teams.map((team) =>
            <TeamCard 
                key={team.team_name}
                name={team.team_name}
                ownerName={team.owner_name}
                dateJoined={team.date_joined.slice(0, 10)}
            />
        )}
        </div>
        <div>
            <h3>Need to start a team?</h3>
            <button onClick={() =>  navigate('../newTeam')}>Create Team</button>
        </div>
    </Container>   
    )
}
    

export default TeamList;
