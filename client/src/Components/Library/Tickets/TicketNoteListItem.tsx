import React from 'react';
import { TicketNote } from '../../../API/interfaces/TicketNote';

interface Props {
    note: TicketNote
}

export default function TicketNoteListItem(props: Props){
    let isPm: boolean = false
    let isSingleDigitMinutes: boolean = false
    let date = new Date(props.note.date_created)
    let minutes = date.getMinutes()
    let hours = date.getHours()

    if(hours > 12){
        hours = hours % 12
        isPm = true
    }
    if(hours === 0){
        hours = 12
    }
    if(minutes < 10){
        isSingleDigitMinutes = true
    }

    return (
        <div className='noteListItem'>
            <div style={{display: 'flex', width: 'fit-content', height: '100%'}}>
                <p className='username' style={{marginTop: '0px'}}>{`${props.note.author_username}\u00a0`}</p>
                {/* <p className='discriminator' style={{height: '11px', marginTop: '3px'}}>#{props.note.author_discriminator}</p> */}
            </div>
            <div style={{height: 'fit-content', marginLeft:'5px', wordBreak: 'break-word' }}>
                <p style={{margin: '0px', height: 'fit-content'}}>
                    {props.note.body}
                    <span className='time'>
                        {` ${hours}:${isSingleDigitMinutes ? '0' : ''}${minutes}${isPm ? 'pm' : 'am'}`}
                    </span>
                </p>
            </div>
        </div>
    )
}