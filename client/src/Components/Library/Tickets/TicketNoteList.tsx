import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import React, {useState, useEffect, ReactEventHandler} from 'react';
import { useSelector } from 'react-redux';
import { TicketNote } from '../../../API/interfaces/TicketNote';
import postTicketComment from '../../../API/Requests/Tickets/PostTicketComment';
import { State } from '../../../Redux/reducers';
import TicketNoteListItem from './TicketNoteListItem';
import * as _ from 'lodash'
import ChatDateDivider from '../Feed/ChatDateDivider';
import { Formik } from 'formik';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { AlertActionCreators } from '../../../Redux';
import { bindActionCreators } from 'redux';
import { hideAlert } from '../../../Redux/action-creators/alertActionCreator';

export default function TicketNoteList() {
    const dispatch = useDispatch();
    const { fireAlert, hideAlert } = bindActionCreators(AlertActionCreators, dispatch)
    const focusedTicketState = useSelector((state: State) => state.focusedTicket)
    const sessionState = useSelector((state: State) => state.session)
    const socketState = useSelector((state: State) => state.socket)
    const [chosenNotes, setChosenNotes] = useState<any[]>([]);
    const [allNotes, setAllNotes] = useState<TicketNote[]>([]);
    
    useEffect(() => {
        if(socketState){
            socketState.on('newTicketNote', (note: TicketNote) => {
                setAllNotes(previousState => [note, ...previousState])
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
    }, [focusedTicketState])

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

   

    function ticketNoteListLoop(){
        if(!chosenNotes){return}
        let arrayList = []
        let i = 0
        do{
            arrayList.push(<TicketNoteListItem note={chosenNotes[i]} />)
            i++
        } while(i < chosenNotes.length)
        
        return arrayList
    }

    let anyNotes: boolean = false
    if(chosenNotes){
        anyNotes = chosenNotes.length > 0;
    }
    if(focusedTicketState.ticket_id === undefined){
        return (
            <div className='fadeIn ticketNoteListContainer' >
                <div className='list delayedFadeIn' style={{color: '#ffffff', textAlign: 'center', paddingTop: '10px', height: '100%'}}>
                    <p >{`Please select a ticket`}</p>
                </div>
            </div>
        )
    }else {
        return (
            <>
               
                <div className='fadeIn ticketNoteListContainer' style={{transition: '0'}}>
                    {anyNotes ? 
                    <div id='list' className='ticketNoteList componentGlow delayedFadeIn' style={{paddingTop: '10px', transition: '0s'}}>    
                        {ticketNoteListLoop()}
                    </div>
                    : 
                    <div className='list ticketNoteList delayedFadeIn' style={{color: '#ffffff31', textAlign: 'center', paddingBottom: '10px', transition: '0'}}>
                        <p>{`There are no notes for this ticket yet`}</p>
                    </div>}
                    
                    <Formik 
                        initialValues={{note: ''}}
                        onSubmit={(data, {resetForm}) => {
                            async function handleNoteSubmit(note: string){
                                if(note.length > 300){
                                    fireAlert({
                                        isOpen: true,
                                        status: 0,
                                        message: 'Too many characters...'
                                    });
                                    return setTimeout(hideAlert, 6000)
                                }
                                if(note.length < 1){
                                    fireAlert({
                                        isOpen: true,
                                        status: 0,
                                        message: 'Empty comments not allowed...'
                                    });
                                    return setTimeout(hideAlert, 6000)
                                }
                                let response = await postTicketComment(data.note, focusedTicketState);
                                if(response.status === 200){
                                    let newTicketNoteToEmit: TicketNote = {
                                        comment_id: response.body.insertID, 
                                        author_username: sessionState.currentUser.username, 
                                        author_discriminator: sessionState.currentUser.discriminator,
                                        body: note,
                                        relevant_ticket_id: focusedTicketState.ticket_id,
                                        date_created: moment().add(4, 'hours').format().slice(0,19).split('T').join(' ')
                                    };
                                    setAllNotes(previousState => [ ...previousState, newTicketNoteToEmit])
                                    socketState.emit(
                                        'newTicketNote',
                                        newTicketNoteToEmit
                                    )
                                    resetForm()
                                } else{
                                    fireAlert({
                                        isOpen: true,
                                        status: response.status,
                                        message: response.body.message
                                    });
                                    setTimeout(hideAlert, 6000)
                                }
                            }
                            return handleNoteSubmit(data.note)
                        }}
                    >
                    {({values, handleChange, handleBlur, handleSubmit, handleReset}) => {
                            return (
                                <form className='form' style={{width: '100%'}} onSubmit={handleSubmit} onBlur={handleBlur}>
                                    
                                <div className='ticketNoteForm' >
                                    <TextField
                                        label='Message'
                                        type='text'
                                        value={values.note}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className='formComponent'
                                        name='note'
                                        variant='standard'
                                        color='info'
                                    />
                                </div>
                                </form>
                            )}
                        }
                    </Formik>
                </div>
               
            </>            
        )
    }
}

