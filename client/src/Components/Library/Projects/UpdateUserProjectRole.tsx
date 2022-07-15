import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../../Redux/reducers';

interface Props {
    setIsFormDirty: any;
    isFormDirty: boolean;
    word: string;
    setWord: any;
}

export default function UpdateUserProjectRole(props: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const focusedProjectState = useSelector((state: State) => state.focusedProject)

    useEffect(()=>{
        handleReset()
    }, [focusedProjectState])

    function handleReset(){
        setIsOpen(false)
        props.setIsFormDirty(false)
        props.setWord('Update')
    }
    function handleClick(choice: any){
        if(isOpen === true){
            props.setWord(choice)
            props.setIsFormDirty(true)
        }
        setIsOpen(!isOpen)
    }

   
    return (
        <>
            {isOpen ? 
            <div style={{marginBottom: '10px'}}>
                <span id='RoleUpdate' className='fadeIn inComponentButton scaleYonHover' onClick={() => handleClick('Project Lead')} style={{display: 'inline-block', width: 'fit-content'}}>
                    <div>Project Lead</div>
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
                <span id='RoleUpdate' className='rowItem fadeIn inComponentButton scaleYonHover' onClick={handleClick} style={{display: 'inline-block', width: 'fit-content', textAlign: 'center'}}>
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