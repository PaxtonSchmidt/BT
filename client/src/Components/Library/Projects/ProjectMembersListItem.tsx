import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FocusedMemberActionCreators } from '../../../Redux';
import { State } from '../../../Redux/reducers';
import {translateRole} from '../../../Services/translateRole'

interface Props{
    member: any;
}

export default function ProjectMembersListItem(props: Props) {
    const dispatch = useDispatch();
    const { updateFocusedMember } = bindActionCreators(FocusedMemberActionCreators, dispatch)
    const focusedProjectState = useSelector((state: State) => state.focusedProject)
    let role = translateRole.TranslateProjectRole(props.member.role_id)
    
    function handleSelect(){
        if(focusedProjectState.name !== 'All'){
            return updateFocusedMember(props.member)
        }
    }
    return (
        <div className='ListContainer' onClick={handleSelect}>
            <div  className={`listItem listRow memberRow ${focusedProjectState.name === 'All' && 'defaultCursor'}`} style={{justifyContent: 'space-between'}}>
                <div className='memberListRowSection' style={{textAlign: 'center'}}>
                    <span className='rowItem username' style={{display: 'inline-block', width: 'fit-content'}}>
                        {props.member.username } 
                    </span>
                    <span className='rowItem discriminator' style={{display: 'inline-block', width: 'fit-content'}}>
                      #{props.member.discriminator}
                    </span>
                    {focusedProjectState.name !== 'All' && <span className='showDetailsHighlight'>{`Show details`}</span>}
                </div>
                
                <div className='memberListRowSection' style={{textAlign: 'center', width: '100px'}}>
                    <span className='rowItem'>
                        {focusedProjectState.name === 'All' ? <></> :
                        <>{role}</>}
                    </span>
                </div>
            </div>
        </div>
    )
}
