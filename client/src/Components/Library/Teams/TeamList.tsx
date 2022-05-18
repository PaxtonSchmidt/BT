import React, {useState, useEffect} from 'react';
import { SetStateAction } from 'react';
import { Container } from 'react-bootstrap';
import TeamCard from './TeamCard';

function TeamList() {
    const [teams, setTeams] = useState<any[]>([]);

    useEffect(() => {
        fetch('/teams/getTeams')
        .then((res => {
            if(res.ok) {
                return res.json();
            } else {
                return console.log(res.json);
            }
        }))
        .then(jsonRes => setTeams(jsonRes));
    }, [])  
 
     //needs pagination
    return (
    <Container className='pageBodyContainer1'>
        <div className='list' style={{textAlign: 'left', height: '20px', backgroundColor: 'white', width: '100%'}}>
            <h1>adsads</h1>
            {teams.map((team) =>
            <TeamCard 
                key={team.name}
                name={team.name}
                ownerName={team.owner}
                dateJoined={team.dateJoined}
            />
        )}
        </div>
    </Container>   
    )
}
    

export default TeamList;
