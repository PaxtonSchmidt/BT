import React, { useEffect, useState } from 'react';
import swap from '../../../Images/Icons/arrow-left-right.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal } from '@mui/material';

interface Props {
    teamRole: number;
    isExpanded: boolean;
    setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}
interface Destinations {
    tickets: string;
    projects: string;
    team: string;
    selectTeam: string;
}

export default function SidebarModal(props: Props) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const location = useLocation();
    const navigate = useNavigate();
    let destinations: Destinations = {
        tickets: '/tickets',
        projects: '/projects',
        team: '/team',
        selectTeam: '/selectTeam',
    };
    const [chosenPage, setChosenPage] = useState<string>(location.pathname);
    useEffect(()=>setChosenPage(location.pathname), [location.pathname])
    useEffect(()=>{
        setIsOpen(props.isExpanded)
    }, [props.isExpanded])
    let isTeamOwnerOrLead = props.teamRole === 1 || props.teamRole === 2;
    function handleNavSelect(location: string) {
        setIsOpen(false)
        props.setIsExpanded(false)
        navigate(location);
    }

    function handleSelect(destination: string) {
        handleNavSelect(destination);
        setChosenPage(destination);
    }
    return (
        <>
        <Modal open={props.isExpanded} onClose={()=>{setIsOpen(false); props.setIsExpanded(false)}} disableAutoFocus={true} >
            <div
            className='sideBarModal navComponent'
            style={{ width: `${props.isExpanded ? '180px' : ''}` }}>
            <div>
                <div className={`navItem scaleYonHover sideBarItem `}  onClick={() => props.setIsExpanded(false)}>
                    <div className='sidebarIconContainer' style={{width: '25px'}}>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='20'
                        height='20'
                        fill='white'
                        className='bi bi-x-square'
                        viewBox='0 0 16 16'
                      >
                        <path d='M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z' />
                        <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />
                      </svg>
                    </div>
                </div>

                <div className={`navItem sideBarItem scaleYonHover ${chosenPage === destinations.tickets? 'chosenSideBarButton': ''}`} onClick={() => handleSelect(destinations.tickets)}>
                    <div className='sidebarIconContainer'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='28'
                            height='28'
                            fill={`${
                                chosenPage === destinations.tickets
                                    ? '#222222'
                                    : 'white'
                            }`}
                            className='bi bi-journal'
                            viewBox='0 0 16 16'>
                            <path d='M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z' />
                            <path d='M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z' />
                        </svg>
                    </div>
                    {props.isExpanded && (
                        <p className='sidebarButtonText fadeIn' style={{color: `${chosenPage === destinations.tickets? '#222222': 'white'}`,}}>
                            Tickets
                        </p>
                    )}
                </div>

                <div className={`navItem sideBarItem scaleYonHover 
                    ${chosenPage === destinations.projects ? 'chosenSideBarButton' : ''}`} onClick={() => handleSelect(destinations.projects)}>
                    <div className='sidebarIconContainer'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='28'
                            height='28'
                            fill={`${
                                chosenPage === destinations.projects
                                    ? '#222222'
                                    : 'white'
                            }`}
                            className='bi bi-person-lines-fill'
                            viewBox='0 0 16 16'>
                            <path d='M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z' />
                        </svg>
                    </div>
                    {props.isExpanded && (
                        <p className='sidebarButtonText fadeIn' style={{color: `${chosenPage === destinations.projects? '#222222': 'white'}`,}}>
                            Projects
                        </p>
                    )}
                </div>

                {isTeamOwnerOrLead ? (
                    <div className={`navItem sideBarItem scaleYonHover ${chosenPage === destinations.team? 'chosenSideBarButton': ''}`} onClick={() => handleSelect(destinations.team)}>
                        <div className='sidebarIconContainer'>
                            <svg xmlns='http://www.w3.org/2000/svg' width='28' height='28'fill={`${chosenPage === destinations.team ? '#222222' : 'white'}`} className='bi bi-people' viewBox='0 0 16 16'>
                                <path d='M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z' />
                            </svg>
                        </div>
                        {props.isExpanded && (
                            <p
                                className='sidebarButtonText fadeIn'
                                style={{
                                    color: `${
                                        chosenPage === destinations.team
                                            ? '#222222'
                                            : 'white'
                                    }`,
                                }}>
                                Team
                            </p>
                        )}
                    </div>
                ) : (
                    <></>
                )}
            </div>

            <div
                className={`navItem sideBarItem scaleYonHover 
                ${
                    chosenPage === destinations.selectTeam
                        ? 'chosenSideBarButton'
                        : ''
                }`}
                style={{ marginTop: 'auto' }}
                onClick={() => handleSelect(destinations.selectTeam)}>
                <div className='sidebarIconContainer'>
                    <img
                        src={swap}
                        alt='Work for a different team'
                        className='sidebarIcon longFadeIn'
                    />
                </div>
                {props.isExpanded && (
                    <p
                        className='sidebarButtonText fadeIn'
                        style={{
                            color: `${
                                chosenPage === destinations.selectTeam
                                    ? '#222222'
                                    : 'white'
                            }`,
                        }}>
                        Swap Team
                    </p>
                )}
            </div>
        </div>
    </Modal>
    </>
    );
}
