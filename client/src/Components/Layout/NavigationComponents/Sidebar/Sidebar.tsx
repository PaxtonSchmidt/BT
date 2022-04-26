import React from 'react';
import house from '../../../Images/Icons/house.svg';
import project from '../../../Images/Icons/project.svg';
import ticket from '../../../Images/Icons/ticket.svg';
import people from '../../../Images/Icons/people.svg';
import swap from '../../../Images/Icons/arrow-left-right.svg';
import { Link } from 'react-router-dom';

export default function Sidebar() {
    return (
        <div className='sideBar navComponent'>
            <div >
                <div className='navItem sideBarItem'>
                    <Link to='/'>
                    <img src={house} alt='go to dashboard' className='sidebarIcon scaleYonHover'/>
                    </Link>
                </div>
                
                <div className='navItem sideBarItem'>
                    <Link to='tickets'>
                        <img src={ticket} alt='go to dashboard' className='sidebarIcon scaleYonHover'/>
                    </Link>
                </div>
                
                <div className='navItem sideBarItem'>
                    <Link to='projects'>
                    <img src={project} alt='go to dashboard' className='sidebarIcon scaleYonHover'/>
                    </Link>
                </div>
                
                <div className='navItem sideBarItem'>
                    <Link to='team'>
                    <img src={people} alt='go to dashboard' className='sidebarIcon scaleYonHover'/>
                    </Link>
                </div>
            </div>
            
            <div className='navItem sideBarItem' style={{marginTop: 'auto'}}>
                <Link to='/'>
                    <img src={swap} alt='go to dashboard' className='sidebarIcon scaleYonHover'/>
                </Link>
            </div>
    
        </div>
    )
}
