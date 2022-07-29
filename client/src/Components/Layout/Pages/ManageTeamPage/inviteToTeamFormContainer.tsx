import React, { Dispatch, SetStateAction, useState } from 'react'
import InviteToTeamForm from '../../../Library/Forms/inviteToTeamForm'

interface Props{
    isExtended: boolean,
    setIsExtended: Dispatch<SetStateAction<boolean>>
}

export default function InviteToTeamForContainer(props: Props){
    return (
        <div id='pageContentContainer' className='FormContainer fadeIn' style={{display: 'flex', alignItems: 'center'}}>
            <InviteToTeamForm isExtended={props.isExtended} setIsExtended={props.setIsExtended} />
            <div className='formLoadAnim'>
                <h1 onClick={()=>props.setIsExtended(!props.isExtended)} className='button svgSibling' style={{width: '100%', cursor: 'pointer', backgroundColor: 'transparent', marginBottom: '0px', marginTop: '3px', marginRight:'0px'}}>Invite Someone</h1>
                <svg onClick={()=>props.setIsExtended(!props.isExtended)} style={{paddingRight: '0px'}} id='bi-arrow-bar-down' xmlns="http://www.w3.org/2000/svg" width="100%" height="25" fill="currentColor" className={`bi bi-arrow-bar-down ${props.isExtended ? 'twist noPadding' : ''}`} viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z"/>
                </svg> 
            </div>
        </div>
    )
}