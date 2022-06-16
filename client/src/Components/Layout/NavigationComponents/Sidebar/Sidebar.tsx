import React from 'react';
import house from '../../../Images/Icons/house.svg';
import project from '../../../Images/Icons/project.svg';
import ticket from '../../../Images/Icons/ticket.svg';
import people from '../../../Images/Icons/people.svg';
import swap from '../../../Images/Icons/arrow-left-right.svg';
import { Link } from 'react-router-dom';
import { authService } from '../../../../Services/AuthService';
import { useSelector } from 'react-redux';
import { State } from '../../../../Redux/reducers';

interface Props{
    teamRole: number;
}

export default function Sidebar(props: Props) {
    let isTeamOwner = props.teamRole === 1
    
    return (
        <div className='sideBar navComponent fadeIn'>
            <div >
                <div className='navItem sideBarItem'>
                    <Link to='dashboard'>
                    <img src={house} alt='go to dashboard' className='sidebarIcon scaleYonHover longFadeIn'/>
                    </Link>
                </div>
                
                <div className='navItem sideBarItem'>
                    <Link to='tickets'>
                        <img src={ticket} alt='go to tickets' className='sidebarIcon scaleYonHover longFadeIn'/>
                    </Link>
                </div>
                
                <div className='navItem sideBarItem'>
                    <Link to='projects'>
                    <img src={project} alt='go to projects' className='sidebarIcon scaleYonHover longFadeIn'/>
                    </Link>
                </div>
                
                {isTeamOwner ?
                <div className='navItem sideBarItem'>
                    <Link to='team'>
                    <img src={people} alt='go to team' className='sidebarIcon scaleYonHover longFadeIn'/>
                    </Link>
                </div>
                : <></>}
                
            </div>
            
            
            {/* This component will be a quick switch between teams the current user belongs to. Requires re-login by expiring token? */}
            <div className='navItem sideBarItem' style={{marginTop: 'auto'}}>
                <Link to='/selectTeam' >
                    <img src={swap} alt='Work for a different team' className='sidebarIcon scaleYonHover longFadeIn'/>
                </Link>
            </div>
    
        </div>
    )
}
