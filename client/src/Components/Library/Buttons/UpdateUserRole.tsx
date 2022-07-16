import { type } from 'os';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../../Redux/reducers';

interface Props {
    setIsFormDirty?: any,
    isFormDirty?: boolean,
    word?: string,
    setWord?: any,
    type?: string,

}

export default function UpdateUserRole(props: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const focusedProjectState = useSelector((state: State) => state.focusedProject)
    const focusedTeammateState = useSelector((state: State) => state.focusedTeammate)
    let subscribedState: any = null;
    if(props.type === 'Project'){
        subscribedState = focusedProjectState
    } else if(props.type === 'Team'){
        subscribedState = focusedTeammateState
    }


    useEffect(()=>{
        handleReset()
    }, [subscribedState])

    function handleReset(){
        setIsOpen(false)
        if(props.type === 'Project'){
            props.setIsFormDirty(false)
            props.setWord('Update')
        }
    }
    function handleClick(choice: any){
        if(isOpen === true){
            if(props.type === 'Project'){
                props.setWord(choice)
                props.setIsFormDirty(true)
            }
        }
        setIsOpen(!isOpen)
    }

    let roleType: string = ''
    if(props.type === 'Project'){
        roleType = 'Project'
    }
    return (
        <>
            {isOpen ? 
            <div style={{marginBottom: '10px'}}>
                <span id='RoleUpdate' className='fadeIn inComponentButton scaleYonHover' onClick={() => handleClick('Project Lead')} style={{display: 'inline-block', width: 'fit-content'}}>
                    <div>{roleType} Lead</div>
                </span>
                <span id='RoleUpdate' className='fadeIn inComponentButton scaleYonHover' onClick={() => handleClick('Developer')} style={{display: 'inline-block', width: 'fit-content', marginLeft: '2px'}}>
                    <div>Developer</div>
                </span>
                <span id='RoleUpdate' className='fadeIn inComponentButton scaleYonHover resetRolesButton' onClick={handleReset} style={{display: 'inline-block', width: 'fit-content'}}>
                    <div>X</div>
                </span>
            </div>
            :
            <div className='memberListRowSection'>
                <span id='RoleUpdate' className='rowItem fadeIn inComponentButton scaleYonHover' onClick={handleClick} style={{display: 'inline-block', width: 'fit-content', textAlign: 'center', height: 'fit-content'}}>
                    {props.word}
                </span>
                {props.isFormDirty ? 
                <span id='RoleUpdate' className='inComponentButton scaleYonHover resetRolesButton' onClick={handleReset} style={{display: 'inline-block', width: 'fit-content'}}>
                    <div>X</div>
                </span>
                :<></>}
            </div>
            }
        </>            
    )
}