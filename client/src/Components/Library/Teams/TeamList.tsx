import React, { useState, Dispatch } from 'react';
import { SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import postSelectTeam from '../../../API/Requests/Login/PostSelectTeam';
import { authService } from '../../../Services/AuthService';
import { Team, Teams } from '../../../Redux/interfaces/teams';
import TeamCard from './TeamCard';
import { bindActionCreators } from 'redux';
import { AlertActionCreators } from '../../../Redux';
import alertDispatcher from '../../../API/Requests/AlertDispatcher';

interface Props {
  setIsTeamSelected: Dispatch<SetStateAction<boolean>>;
}

function TeamList(setIsTeamSelected: Props) {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { fireAlert, hideAlert } = bindActionCreators(AlertActionCreators,dispatch);
  const initial: Team[] = [];
  const teamsState = useSelector((state: Teams) => state.teams);
  let teams = Object.assign(initial, teamsState);

  async function handleSelect(team: string) {
    let response = await postSelectTeam({ team })
    if(response.isOk){
      authService.selectTeam();
      setIsTeamSelected.setIsTeamSelected(true);
      navigate('/tickets');
    }else{
      alertDispatcher(fireAlert, response.error, hideAlert)
    }
  }

  function handleGoToCreateTeam() {
    navigate('/newTeam');
  }

  if (teams && teams.length < 1) {
    return (
      <div className='delayedFadeIn'>
        <h1 style={{ color: 'white' }}>You don't have any teams</h1>
        <button className='button' onClick={() => handleGoToCreateTeam()}>
          Create a team
        </button>
      </div>
    );
  }
  return (
    <>
      {teams.map((team: any) => (
        <div key={team.team_id} onClick={() => handleSelect(team.team_id)}>
          <TeamCard
            name={team.team_name}
            ownerName={team.owner_name}
            dateJoined={team.date_joined.slice(0, 10)}
            ownerDiscriminator={team.owner_discriminator}
          />
        </div>
      ))}
    </>
  );
}

export default TeamList;
