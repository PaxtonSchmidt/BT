import React, { useState } from 'react'
import { DemoAccountType, DemoCharacters } from './DemoCharacters'
import personJessie from '../../../../Images/Icons/person-circleJessie.svg'
import personJamie from '../../../../Images/Icons/person-circleJamie.svg'
import personJordan from '../../../../Images/Icons/person-circleJordan.svg'
import { Paper } from '@mui/material'
import { BreakPoints } from '../../../../Library/Breakpoints'
import postDemoLogin from '../../../../../API/Requests/Login/Demo.ts/DemoLogin'
import { bindActionCreators } from 'redux'
import { useDispatch } from 'react-redux'
import { AlertActionCreators, LoginActionCreators } from '../../../../../Redux'
import alertDispatcher from '../../../../../API/Requests/AlertDispatcher';
import { CustomResponse } from '../../../../../API/Requests/Base/baseRequest'
import { useNavigate } from 'react-router-dom'

interface Props {
    character: DemoAccountType
    windowWidth: number
}

export const DemoAccount: React.FC<Props> = ( { character, windowWidth } ) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { fireAlert, hideAlert } = bindActionCreators(AlertActionCreators,dispatch);
    const { login } = bindActionCreators(LoginActionCreators, dispatch);
    const [elevation, setElevation] = useState<number>(1)
    
    let plurality: string = character.teamCount !== 1 ? 's' : ''

    async function handleDemoLogin(characterName: string){
        let response: CustomResponse = await postDemoLogin(characterName)
        if(response.isOk){
            login() //update redux login state
            navigate('/selectTeam');
        } else {
            alertDispatcher(fireAlert, response.error, hideAlert)
        }
    }

    return (
    <Paper 
    onMouseEnter={()=>setElevation(3)} 
    onMouseLeave={()=> setElevation(1)} 
    onClick={()=>handleDemoLogin(character.name)}
    className='scaleYonHover' 
    elevation={elevation} 
    style={{
        backgroundColor: '#222222', 
        color: 'white', 
        width: '30%', 
        minWidth: `
        ${windowWidth > BreakPoints.tablet 
            ? '185px' 
            : windowWidth > BreakPoints.mobile 
                ? '140px' 
                : '100%'}`, 
        cursor: 'pointer', 
        transition: '.5s'
    }}>
        <h1 style={{fontSize: `${windowWidth > BreakPoints.mobile ? '' : '16px'}`, marginLeft: `${windowWidth > BreakPoints.tablet ? '40px' : '20px'}`, marginRight: `${windowWidth > BreakPoints.mobile ? '20px' : '15px'}`, marginBottom: `${windowWidth > BreakPoints.mobile ? '20px' : '10px'}`, marginTop: `${windowWidth > BreakPoints.mobile ? '20px' : '10px'}` }}>{character.name}</h1>
        <figure style={{margin: `${windowWidth > BreakPoints.tablet ? '' : '20px'}`, display: `${windowWidth > BreakPoints.mobile ? '' : 'flex'}`, marginTop: `${windowWidth > BreakPoints.mobile ? '' : '10px'}`, transition: '0s !important'}}>
            <img src={character.name === DemoCharacters.Jessie.name ? personJessie : (character.name === DemoCharacters.Jamie.name ? personJamie : personJordan)} style={{height: '40px', width: '40px'}} />
            <p style={{marginLeft: `${windowWidth > BreakPoints.mobile ? '' : '10px'}`}}>{character.description}</p>
            {windowWidth > BreakPoints.mobile && <p>{`Involved in ${character.teamCount} team${plurality}`}</p>}
        </figure>
    </Paper>
    )
}