import { Box, Modal } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Teammate } from '../../../../API/interfaces/teammate'
import { State } from '../../../../Redux/reducers'
import { translateRole } from '../../../../Services/translateRole'
import TeammateProjectButton from './TeammateProjectButton'

interface AssignedProjects{
    project_name: string, 
    role_id: number
}
export interface TeammatesInformation extends Teammate{
    username: string, 
    discriminator: number, 
    team_role: number,
    date_joined: string,
    enlisted_by_username: string, 
    enlisted_by_discriminator: number,
    projects: AssignedProjects[]
}

export default function TeammateDetails(){
    const sessionState = useSelector((state: State) => state.session)
    const focusedTeammateState = useSelector((state: State) => state.focusedTeammate)
    const [teammatesInformation, setTeammatesInformation] = useState<TeammatesInformation[]>();
    const [chosenTeammate, setChosenTeammate] = useState<TeammatesInformation>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
   console.log(focusedTeammateState)
    async function getTeamatesInformation(){
        setIsLoading(true)
        let response: any = fetch('/teams/getTeammatesInformation', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        setTeammatesInformation(await response)
        setIsLoading(false)
    }
    useEffect(()=>{getTeamatesInformation()}, [])
    
    function handleNewTeammate(){
        let chosenTeammate: TeammatesInformation | undefined = teammatesInformation!.find((teammate: TeammatesInformation) => {
            if(teammate.username === focusedTeammateState.username && teammate.discriminator === focusedTeammateState.discriminator){
                return true
            }
        })
        setChosenTeammate(chosenTeammate)
    }
    useEffect(()=>{if(teammatesInformation !== undefined){handleNewTeammate()}}, [focusedTeammateState, teammatesInformation])

    async function handleRemoveTeammate(){
        return console.log('a')
    }

    let role = null
    let date = ''
    if(chosenTeammate){
        role = translateRole.TranslateRole(chosenTeammate?.team_role);
        date = chosenTeammate.date_joined.toString().substring(0, 10);
    }
    
    if(isLoading){
        return (
            <>
            <div className='list delayedFadeIn' style={{height: '100%', textAlign: 'center', paddingTop: '15px'}}>Loading...</div>
            </>
        )
    } else if(!chosenTeammate){
        return (
            <>
            <div className='list fadeIn'  style={{height: '100%', textAlign: 'center', paddingTop: '15px', transition: '0s'}}>Select a teammate to see their details</div>
            </>
        )
    } else {
        return(
            <>
            <div id='list'  className='list componentGlow fadeIn' style={{position: 'relative', height: '350px', overscrollBehavior: 'auto', overflowY: 'hidden', transition: '0s'}}>
                <div className='ListContainer'>
                    <div className='listItem listRow memberRow manageMemberListRow' style={{justifyContent: 'space-between', marginTop: '0px'}}>
                        <div className='memberListRowSection' style={{textAlign: 'left'}}>
                            <span className='rowItem username' style={{display: 'inline-block', width: 'fit-content'}}>
                                {chosenTeammate.username}
                            </span>
                            <span className='rowItem discriminator' style={{display: 'inline-block', width: 'fit-content'}}>
                                #{chosenTeammate.discriminator}
                            </span>
                        </div>
                    </div>
                    <div className='listItem listRow memberRow manageMemberListRow' style={{justifyContent: 'space-between'}}>
                        <div className='memberListRowSection' style={{textAlign: 'left'}}>
                            <span className='rowItem username' style={{display: 'inline-block', width: 'fit-content'}}>
                                {focusedTeammateState.email}
                            </span>
                        </div>
                    </div>
                    <div className='listItem listRow memberRow manageMemberListRow' style={{justifyContent: 'space-between'}}>      
                        <div className='memberListRowSection' style={{textAlign: 'left'}}>
                            <span className='rowItem username' style={{display: 'inline-block', width: 'fit-content'}}>
                                Enlisted by
                            </span>
                            <span className='rowItem username' style={{display: 'inline-block', width: 'fit-content'}}>
                                {`\u00A0${chosenTeammate.enlisted_by_username}`}
                            </span>
                            <span className='rowItem discriminator' style={{display: 'inline-block', width: 'fit-content', opacity: '30%', fontSize: '11px'}}>
                                {`#${chosenTeammate.enlisted_by_discriminator}`}
                            </span>        
                        </div>
                    </div>
                    <div className='listItem listRow memberRow manageMemberListRow ' style={{justifyContent: 'space-between'}}>
                        <div className='memberListRowSection' style={{textAlign: 'left'}}>
                            <span className='rowItem' style={{display: 'inline-block', width: 'fit-content'}}>
                                Joined
                            </span>
                            <span className='rowItem' style={{display: 'inline-block', width: 'fit-content'}}>
                                {`\u00A0on ${date}`}
                            </span>
                        </div>
                    </div>
                    <div className='listItem listRow memberRow manageMemberListRow ' style={{justifyContent: 'space-between'}}>
                        <div className='memberListRowSection' style={{textAlign: 'left', width: '100%'}}>
                            <span className='rowItem' style={{display: 'inline-block', width: '100%'}}>
                                {`Projects ${chosenTeammate.username} is in:`}
                            </span>
                            <span className='rowItem teammateProjectList' style={{overflowX:'hidden', height: 'fit-content', maxHeight: '70px'}}>
                                {chosenTeammate?.projects.map((project: AssignedProjects) => 
                                    <>
                                    <TeammateProjectButton Project={project.project_name} teammateUsername={chosenTeammate.username} teammateDiscriminator={chosenTeammate.discriminator}/>
                                    </>
                                )}
                            </span>
                        </div>
                    </div>
                </div>
                <div className='removeMemberButton ' style={{marginTop:'auto', backgroundColor: '#222222', paddingRight: '10px', flexGrow: '1'}}>
                    <div onClick={()=>setIsModalOpen(true)} style={{cursor: 'pointer', display: 'flex', alignItems: 'center'}}>
                        <p style={{marginRight: '10px', cursor: 'pointer'}}>Remove</p>
                        <svg  xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-x-square" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </div>
                </div>
            </div>
            <Modal
            open={isModalOpen}
            style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Box className='modalBoxContainer'>
                    <div className='modalBox'>
                        <p style={{color: 'white'}} onClick={() => setIsModalOpen(false)}>
                            {`Are you sure you want to remove\u00a0`}
                            <span className='rowItem username' style={{display: 'inline-block', width: 'fit-content', color: '#efff0a'}}>
                                {focusedTeammateState.username}
                            </span>
                            <span className='rowItem discriminator' style={{display: 'inline-block', width: 'fit-content', color: '#efff0a'}}>
                                #{focusedTeammateState.discriminator}
                            </span>
                            {`\u00a0from\u00a0`}
                            <span className='rowItem' style={{display: 'inline-block', width: 'fit-content', color: '#efff0a'}}>
                                {sessionState.currentTeam.name}
                            </span>
                        </p>
                        <ul className='modalList'>
                            <p>These effects will occur...</p>
                            
                            
                            
                            
                        </ul>
                        <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                            <button onClick={() => setIsModalOpen(false)} className='button modalButton modalButtonCancel' >Cancel</button>
                            <button onClick={() => handleRemoveTeammate()} className='button modalButton modalButtonConfirm' >Confirm</button>
                        </div>
                    </div>
                    
                </Box>
            </Modal>
            </>
        )
    }
}