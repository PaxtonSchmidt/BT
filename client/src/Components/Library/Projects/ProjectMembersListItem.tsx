import { dividerClasses } from '@mui/material';
import React, {useState, useEffect} from 'react';
import { ReactElement } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FocusedTicketActionCreators } from '../../../Redux';
import { State } from '../../../Redux/reducers';
import ProjectListItem from './ProjectListItem';

// interface Props{

// }

export default function ProjectMembersListItem() {
        return (
            <div className='ListContainer'>
                <div className='listItem listRow' style={{justifyContent: 'space-between'}}>
                    <div className='memberListRowSection'>
                        <span className='rowItem' style={{display: 'inline-block', width: 'fit-content'}}>
                            Member Username
                        </span>
                        <span className='rowItem' style={{display: 'inline-block', width: 'fit-content'}}>
                            Member Discriminator
                        </span>
                    </div>
                    <div className='memberListRowSection'>
                        <span className='rowItem'>
                            role
                        </span>
                    </div>
                </div>
            </div>
        )
    }

