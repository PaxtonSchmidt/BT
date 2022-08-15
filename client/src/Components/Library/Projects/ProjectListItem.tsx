import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FocusedProjectActionCreators } from '../../../Redux';
import { State } from '../../../Redux/reducers';

interface Props{
    name: string;
}
//a
export default function ProjectListItem(props: Props) {
    const dispatch = useDispatch();
    const { updateFocusedProject } = bindActionCreators(FocusedProjectActionCreators, dispatch)
    const focusedProjectState = useSelector((state: State) => state.focusedProject)
    let name = props.name
    
    function handleSelect(name: any){
        updateFocusedProject({name: name})
    }

    if(focusedProjectState.name === props.name){
        document.getElementById(name)?.classList.add('selectedProjectInList')
        document.getElementById(name)?.classList.remove('scaleYonHover')
    } else {
        document.getElementById(name)?.classList.remove('selectedProjectInList')
        document.getElementById(name)?.classList.add('scaleYonHover')
    }

    return (
        <div onClick={() => handleSelect(name)} className='sideScrollListItem scaleYonHover fadeIn' style={{whiteSpace: 'nowrap', height: '40px', padding: '10px'}} id={name}>
            {name}
        </div>
    )
}