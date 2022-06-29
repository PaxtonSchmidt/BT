import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import React, {useState, useEffect, ReactEventHandler} from 'react';
import { useSelector } from 'react-redux';
import { TicketNote } from '../../../API/interfaces/TicketNote';
import postTicketComment from '../../../API/Requests/Tickets/PostTicketComment';
import { State } from '../../../Redux/reducers';

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
        let notes = await response
        return setAllNotes(notes)
    }
    useEffect(() => {getTicketNotes()}, [])
    function createChosenNotesArray(){
        let newChosenNotes: TicketNote[] = []
        allNotes.forEach((note: TicketNote) => {
            if(note.relevant_ticket_id === focusedTicketState.ticket_id){
                newChosenNotes.push(note)
            }
        });
        console.log(newChosenNotes)
        return newChosenNotes
    } 
    useEffect(() => {setChosenNotes(createChosenNotesArray())}, [focusedTicketState])

    console.log(chosenNotes)
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
    return (
    <>
        {anyNotes ? 
        <div className='fadeIn ticketNoteListContainer'>
            <div id='list' className='list ticketNoteList componentGlow fadeIn'>    
                {
                    chosenNotes.map((note: TicketNote) => 
                        <p>{note.body}</p>
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
            <div className='list ticketNoteList fadeIn'>
                No notes yet
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

