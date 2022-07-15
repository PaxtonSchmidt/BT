import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import React, {useState, useEffect, ReactEventHandler} from 'react';
import { useSelector } from 'react-redux';
import { TicketNote } from '../../../API/interfaces/TicketNote';
import postTicketComment from '../../../API/Requests/Tickets/PostTicketComment';
import { State } from '../../../Redux/reducers';
import TicketNoteListItem from './TicketNoteListItem';

export default function TicketNoteList() {
    const focusedTicketState = useSelector((state: State) => state.focusedTicket)
    const [chosenNotes, setChosenNotes] = useState<any[]>([]);
    const [allNotes, setAllNotes] = useState<any[]>([]);
    const [newNote, setNewNote] = useState<string>('')

    async function getTicketNotes(){
        let response: any = fetch('/tickets/getTicketNotes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        console.log('got here')
        let notes = await response
        return setAllNotes(notes)
    }
    useEffect(() => {getTicketNotes()}, [focusedTicketState])

    function createChosenNotesArray(){
        let newChosenNotes: TicketNote[] = []
        allNotes.forEach((note: TicketNote) => {
            if(note.relevant_ticket_id === focusedTicketState.ticket_id){
                newChosenNotes.unshift(note)
            }
        });
        return newChosenNotes
    } 
    useEffect(() => {setChosenNotes(createChosenNotesArray())}, [focusedTicketState, allNotes])

    async function handleSubmit(note: string){
        if(note.length > 300){return console.log('Too many characters...')}
        if(note.length < 1){return console.log('Empty comments not allowed...')}
        let response = postTicketComment(note, focusedTicketState);
        setNewNote('')
    }

    let anyNotes: boolean = false
    if(chosenNotes){
        anyNotes = chosenNotes.length > 0;
    }
    if(focusedTicketState.ticket_id === undefined){
        return (
            <div className='fadeIn ticketNoteListContainer' >
                <div className='list delayedFadeIn' style={{color: '#ffffff', textAlign: 'center', paddingTop: '10px'}}>
                    <p>{`Select a ticket to see its notes`}</p>
                </div>
            </div>
        )
    }else {
        return (
            <>
                {anyNotes ? 
                <div className='fadeIn ticketNoteListContainer'>
                    <div id='list' className='ticketNoteList componentGlow fadeIn' style={{paddingTop: '10px'}}>    
                        {
                            chosenNotes.map((note: TicketNote) => 
                                <TicketNoteListItem key={note.comment_id} note={note}/>
                            )
                        }
                    </div>
                    <Box component='form' className='ticketNoteForm' onSubmit={(e:  React.FormEvent<HTMLInputElement>)=>{e.preventDefault(); handleSubmit(newNote)}}>
                        <TextField
                        label='Add a note...'
                        type='text'
                        className='ticketNoteInput' 
                        name='title'
                        variant='standard'
                        color='info'
                        onChange={(e)=>setNewNote(e.target.value)}
                        value={newNote}
                        />
                    </Box>
                </div>
                :
                <div className='fadeIn ticketNoteListContainer' >
                    <div className='list ticketNoteList delayedFadeIn' style={{color: '#ffffff31', textAlign: 'center', paddingBottom: '10px'}}>
                        <p>{`There are no notes for this ticket yet`}</p>
                    </div>
                    <Box component='form' className='ticketNoteForm' onSubmit={(e:  React.FormEvent<HTMLInputElement>)=>{e.preventDefault(); handleSubmit(newNote)}}>
                        <TextField
                        label='Add a note...'
                        type='text'
                        className='ticketNoteInput' 
                        name='title'
                        variant='standard'
                        color='info'
                        onChange={(e)=>setNewNote(e.target.value)}
                        value={newNote}
                        />
                    </Box>
                </div>}
            </>            
        )
    }
}

