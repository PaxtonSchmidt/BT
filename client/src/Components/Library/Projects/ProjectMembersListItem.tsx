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
    let role = translateRole.TranslateProjectRole(props.member.role_id)
    
    return (
        <div className='ListContainer' onClick={() => updateFocusedMember(props.member)}>
            <div className='listItem listRow memberRow' style={{justifyContent: 'space-between'}}>
                <div className='memberListRowSection' style={{textAlign: 'center'}}>
                    <span className='rowItem username' style={{display: 'inline-block', width: 'fit-content'}}>
                        {props.member.username } 
                    </span>
                    <span className='rowItem discriminator' style={{display: 'inline-block', width: 'fit-content'}}>
                      #{props.member.discriminator}
                    </span>
                    <span className='showDetailsHighlight'>
                        {`Show details`}
                    </span>
                </div>
                <div className='memberListRowSection' style={{textAlign: 'center'}}>
                    <span className='rowItem'>
                        {role}
                    </span>
                </div>
            </div>
        </div>
    )
}
