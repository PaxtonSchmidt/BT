import React from 'react';
import { Team } from '../../../PropsInterfaces/team';

export default function TeamCard(props: Team) {
    let date: string = props.dateJoined.toString().substring(0, 10);
    
    return(
        <div className='listItem'>
            <span className='listColumnNames'>
                {props.name}
            </span>
            <span className='listColumnNames'>
                {props.dateJoined}
            </span>
            <span className='listColumnNames'>
                {props.ownerName}
            </span>
        </div>
    )
}