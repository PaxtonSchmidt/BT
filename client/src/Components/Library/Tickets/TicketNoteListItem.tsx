import React from 'react';
import { TicketNote } from '../../../API/interfaces/TicketNote';

interface Props {
    note: TicketNote
}

export default function TicketNoteListItem(props: Props){
    return (
        <div className='noteListItem'>
            <div style={{display: 'flex', width: 'fit-content', height: '100%'}}>
                <p className='username' style={{marginTop: '0px'}}>{props.note.author_username}</p>
                <p className='discriminator' style={{height: '11px', marginTop: '3px'}}>#{props.note.author_discriminator}</p>
            </div>
            <div style={{height: 'fit-content', marginLeft:'5px', wordBreak: 'break-word' }}>
                <p style={{margin: '0px', height: 'fit-content'}}>
                    {props.note.body}
                </p>
            </div>
        </div>
    )
}