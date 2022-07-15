import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { State } from '../../../../Redux/reducers'

interface TeamDetail{
    owner_username: string,
    owner_discriminator: number,
    date_created: string,
    teammate_count: number,
    lifetime_ticket_count: number
}

export default function TeamDetails(){
    const sessionState = useSelector((state: State) => state.session)
    const [isLoading, setIsLoading] = useState<boolean>();    
    const [teamDetails, setTeamDetails] = useState<TeamDetail>();
    console.log(sessionState)
    console.log(teamDetails)

    async function getTeamatesInformation(){
        setIsLoading(true)
        let response: any = fetch('/teams/getTeamDetails', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        setTeamDetails(await response)
        setIsLoading(false)
    }
    useEffect(()=>{getTeamatesInformation()}, [])

    if(isLoading){return <div className='teamDetails delayedFadeIn'></div>
    } else {
        return (
            <div className='teamDetails fadeIn'>
                <h4 style={{fontSize: '18px', margin: '0px', textAlign: 'center', cursor: 'default'}}>{sessionState.currentTeam.name}</h4>
                <div style={{flexDirection:'row', display:'flex', justifyContent: 'center', marginBottom: '10px', cursor: 'default'}}>
                    <span className='username'>{`\u00a0${teamDetails?.owner_username}`}</span>
                    <span className='discriminator' style={{marginTop: 'auto'}}>#{teamDetails?.owner_discriminator}</span>
                </div>
                <div className='teamDetailsBodyContainer'>
                    <div className='teamDetailSection'>
                        <div className='teamDetailItem'>
                            <div style={{fontSize: '26px', color:'#efff0a'}}>{teamDetails?.teammate_count}</div>
                            <div>
                                <span>teammates</span>
                            </div>
                        </div>    
                    </div>
                    <div className='teamDetailSection'>
                        <div className='teamDetailItem'>
                            <div style={{fontSize: '26px', color:'#efff0a'}}>{sessionState.currentTeam.projects.length}</div>
                            <div>
                                <span>projects</span>
                            </div>
                        </div>
                    </div>
                    <div className='teamDetailSection'>
                        <div className='teamDetailItem'>
                            <div style={{fontSize: '26px', color:'#efff0a'}}>{teamDetails?.lifetime_ticket_count}</div>
                            <div>
                                <span>tickets</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}