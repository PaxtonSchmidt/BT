import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { FocusedMemberActionCreators, FocusedProjectActionCreators } from '../../../../Redux';


interface Props{
    Project: string,
    teammateUsername: string,
    teammateDiscriminator: number
}

export default function TeammateProjectButton(props: Props) {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { updateFocusedProject } = bindActionCreators(FocusedProjectActionCreators, dispatch)
    const { updateFocusedMember } = bindActionCreators(FocusedMemberActionCreators, dispatch)
    
    function handleSelect(){
        updateFocusedMember({username: props.teammateUsername, discriminator: props.teammateDiscriminator})
        updateFocusedProject({name: props.Project})
        navigate('/projects')
    }
    return (
        <div onClick={()=>handleSelect()} className='teammateProjectButton scaleYonHover'>
            {props.Project}
        </div>
    )
}