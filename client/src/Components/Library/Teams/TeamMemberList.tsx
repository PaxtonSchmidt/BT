import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Teammate } from '../../../API/interfaces/teammate';
import { FocusedTeammateActionCreators } from '../../../Redux';
import { State } from '../../../Redux/reducers';
import TeammateListItem from './TeammateListItem';
let deepClone = require('lodash.clonedeep')

export default function TeammateList() {
    const dispatch = useDispatch();
    const { updateFocusedTeammate } = bindActionCreators(FocusedTeammateActionCreators, dispatch)
    const sessionState = useSelector((state: State) => state.session)
    const teammatesState = useSelector((state: State) => state.teammates)
    const focusedTeammate = useSelector((state: State) => state.focusedTeammate)
    let teammates: Teammate[] = []
    
    if(teammatesState[0] !== undefined){teammates = teammatesState}

    function handleTeammateSelect(focusedTeammateIDX: number){
        updateFocusedTeammate(teammates![focusedTeammateIDX])
    }

    
    if(teammates.length === 0){
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
                <div id='list'  className='list membersList componentGlow fadeIn'>
                    {teammates!.map((teammate: any, index: any) =>
                        //docs say its not ideal to use the index for the key
                        //however here it is necessary 
                        <TeammateListItem 
                            key={index} 
                            teammate={teammate} 
                            IDX={index} 
                            handleTeammateSelect={handleTeammateSelect} 
                            focusedTeammateUsername={focusedTeammate.username}
                            focusedTeammateDiscriminator={focusedTeammate.discriminator}
                        /> 
                    )}
                </div>
            </>       
        )
    }   
}