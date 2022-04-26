import { stringify } from 'querystring';
import React from 'react';
import { ticket } from '../../../interfaces/Props/ticket';

export default function ticketListItem(props: ticket) {
    //going to need some code that translates numerical indicators to meaning
    //things like transposePriorityFromNumToString();
    let date: string = props.dateLastUpdated.toString().substring(0, 10);
    
    return(
        <div className='listItem'>
            <span className='listColumnNames'>
                {props.title}
            </span>
            <span className='listColumnNames'>
                {props.relevantProjectID}
            </span>
            <span className='listColumnNames'>
                {props.assignedUserID}
            </span>
            <span className='listColumnNames'>
                {props.priority}
            </span>
            <span className='listColumnNames'>
                {props.resolutionStatus}
            </span>
            <span className='listColumnNames'>
                {date}
            </span>
        </div>
    )
}