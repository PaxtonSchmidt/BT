import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import React, {useState, useEffect, ReactEventHandler} from 'react';
import { useSelector } from 'react-redux';
import { TicketNote } from '../../../API/interfaces/TicketNote';
import postTicketComment from '../../../API/Requests/Tickets/PostTicketComment';
import { State } from '../../../Redux/reducers';
import TicketNoteListItem from './TicketNoteListItem';
import * as _ from 'lodash'
import getCurrentDate from '../../../Services/getCurrentDate';
import ChatDateDivider from '../Feed/ChatDateDivider';

export default function TicketNoteList() {
    const focusedTicketState = useSelector((state: State) => state.focusedTicket)
    const sessionState = useSelector((state: State) => state.session)
    const socketState = useSelector((state: State) => state.socket)
    const [chosenNotes, setChosenNotes] = useState<any[]>([]);
    const [allNotes, setAllNotes] = useState<TicketNote[]>([]);
    const [newNote, setNewNote] = useState<string>('');

    useEffect(() => {
        if(socketState){
            socketState.on('newTicketNote', (note: TicketNote) => {
                console.log(note)
                setAllNotes(previousState => [...previousState, note])
            })
        }
    }, [socketState])

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
    useEffect(() => {
        getTicketNotes()
        if(typeof focusedTicketState.ticket_id !== 'undefined' && socketState){
            socketState.emit('joinTicket', focusedTicketState.ticket_id, focusedTicketState.project_id)
        }
        console.log('emmitted join')
    }, [focusedTicketState])

    function createChosenNotesArray(){
        let newChosenNotes: TicketNote[] = []
        allNotes.forEach((note: TicketNote) => {
            if(note.relevant_ticket_id === focusedTicketState.ticket_id){
                newChosenNotes.unshift(note)
            }
        });
        newChosenNotes = _.sortBy(newChosenNotes, ['comment_id']).reverse()
        return newChosenNotes
    } 
    useEffect(() => {setChosenNotes(createChosenNotesArray())}, [focusedTicketState, allNotes])

    async function handleSubmit(note: string){
        if(note.length > 300){return console.log('Too many characters...')}
        if(note.length < 1){return console.log('Empty comments not allowed...')}
        let response = await postTicketComment(note, focusedTicketState);
        if(response){
            let newTicketNoteToEmit: TicketNote = {
                comment_id: response.insertID, 
                author_username: sessionState.currentUser.username, 
                author_discriminator: sessionState.currentUser.discriminator,
                body: note,
                relevant_ticket_id: focusedTicketState.ticket_id,
                date_created: getCurrentDate()
            };
            setAllNotes(previousState => [...previousState, newTicketNoteToEmit])
            socketState.emit(
                'newTicketNote',
                newTicketNoteToEmit
            )
        } else{
            //fire an error toast 
        }
        setNewNote('')
    }

    function ticketNoteListLoop(){
        if(!chosenNotes){return}
        //loop through the chosen notes to render them and constantly check if there is a difference
        //of calendar days between the current note and last note
        //if there is, insert a divider component in the array before the current note
        let arrayList = []
        let i = 0
        do{
            let isSameAuthor: boolean = false
            if(chosenNotes[i - 1]){
                let lastNoteDate = Math.floor(chosenNotes[i - 1].date_created.substring(0,10).replace(/-/g, ''))
                let currentNoteDate = Math.floor(chosenNotes[i].date_created.substring(0,10).replace(/-/g, ''))
                
                if(currentNoteDate < lastNoteDate){
                    arrayList.push(<ChatDateDivider newDate={chosenNotes[i].date_created}/>)
                }
            }
            console.log(chosenNotes[i].author_username)
            console.log(chosenNotes[i].author_discriminator)
            arrayList.push(<TicketNoteListItem note={chosenNotes[i]} />)
            i++
        } while(i < chosenNotes.length)
        arrayList.push(<ChatDateDivider newDate={chosenNotes[chosenNotes.length - 1].date_created}/>)
        return arrayList
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
                        {ticketNoteListLoop()}
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

