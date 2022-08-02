import React from 'react';
import house from '../../../Images/Icons/house.svg';
import project from '../../../Images/Icons/project.svg';
import ticket from '../../../Images/Icons/ticket.svg';
import people from '../../../Images/Icons/people.svg';
import swap from '../../../Images/Icons/arrow-left-right.svg';
import { Link, useNavigate } from 'react-router-dom';

interface Props{
    teamRole: number
    isExpanded: boolean
}

export default function Sidebar(props: Props) {
    const navigate = useNavigate();
    let isTeamOwnerOrLead = props.teamRole === 1 || props.teamRole === 2
    function handleNavSelect(location: string){
        navigate(location)
    }
    return (
        <div className='sideBar navComponent fadeIn' style={{width: `${props.isExpanded ? '180px' : ''}`}}>
            <div >
                {/* <div className='navItem sideBarItem'>
                    <Link to='dashboard'>
                    <img src={house} alt='go to dashboard' className='sidebarIcon scaleYonHover longFadeIn'/>
                    </Link>
                </div> */}
                
                <div className='navItem sideBarItem scaleYonHover' onClick={()=>handleNavSelect('tickets')}>
                    <div className='sidebarIconContainer'>
                        <img src={ticket} alt='go to tickets' className='sidebarIcon longFadeIn'/>
                    </div>
                    {props.isExpanded &&
                    <p className='sidebarButtonText fadeIn'>Tickets</p>
                    }
                    
                </div>
                
                <div className='navItem sideBarItem scaleYonHover' onClick={()=>handleNavSelect('projects')}>
                    <div className='sidebarIconContainer'>
                        <img src={project} alt='go to projects' className='sidebarIcon longFadeIn'/>
                    </div>
                    {props.isExpanded &&
                    <p className='sidebarButtonText fadeIn'>Projects</p>
                    }
                </div>
                
                {isTeamOwnerOrLead ?
                <div className='navItem sideBarItem scaleYonHover' onClick={()=>handleNavSelect('team')}>
                    <div className='sidebarIconContainer'>
                        <img src={people} alt='go to team' className='sidebarIcon longFadeIn'/>
                    </div>
                    {props.isExpanded &&
                    <p className='sidebarButtonText fadeIn'>Team</p>
                    }
                </div>
                : <></>}
                
            </div>
            
            
            {/* This component will be a quick switch between teams the current user belongs to. Requires re-login by expiring token? */}
            <div className='navItem sideBarItem scaleYonHover' style={{marginTop: 'auto'}} onClick={()=>handleNavSelect('/selectTeam')}>
                <div className='sidebarIconContainer'>
                    <img src={swap} alt='Work for a different team' className='sidebarIcon longFadeIn'/>
                </div>
                {props.isExpanded &&
                    <p className='sidebarButtonText fadeIn'>Swap Team</p>
                }
            </div>
    
        </div>
    )
}
