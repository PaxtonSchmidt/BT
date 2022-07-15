import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Teammate } from '../../../API/interfaces/teammate';
import { FocusedTeammateActionCreators } from '../../../Redux';
import { State } from '../../../Redux/reducers';
import TeammateListItem from './TeammateListItem';
let deepClone = require('lodash.clonedeep')

export interface TeammateDetail extends Teammate{
    email: string
}

export default function TeammateList() {
    const dispatch = useDispatch();
    const { updateFocusedTeammate } = bindActionCreators(FocusedTeammateActionCreators, dispatch)
    const [teammates, setTeammates] = useState<TeammateDetail[]>();
    const sessionState = useSelector((state: State) => state.session)

    async function getTeammates(){
        let response: any = fetch('/teams/getTeammates', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        return setTeammates(await response)
    }
    useEffect(()=>{getTeammates()}, [])

    function handleTeammateSelect(focusedTeammateIDX: number){
        updateFocusedTeammate(teammates![focusedTeammateIDX])
    }

    if(teammates === undefined){
        return (
            <>     
            <div className='listRow fadeIn' style={{marginTop: '0px', backgroundColor: '#222222'}}>      
            </div>
            <div id='list'  className='list projectMembersList componentGlow fadeIn'>
            </div>
            </>  
        )
    } else {
        return(
            <>     
                <div className='listRow fadeIn' style={{marginTop: '0px', backgroundColor: '#222222'}}>      
                    <div className='memberListRowSection fadeIn' style={{textAlign: 'left',width: '110px'}}>
                        <span className='rowItem'>
                        Members of {sessionState.currentTeam.name}
                        </span>
                    </div>
                </div>
                <div id='list'  className='list projectMembersList componentGlow fadeIn'>
                    {teammates?.map((teammate: any, index: any) =>
                        //docs say its not ideal to use the index for the key
                        //however here it is necessary 
                        <TeammateListItem key={index} teammate={teammate} IDX={index} handleTeammateSelect={handleTeammateSelect}/> 
                    )}
                </div>
            </>       
        )
    }   
}