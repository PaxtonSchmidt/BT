import { TextField } from '@mui/material';
import e from 'express';
import { Formik } from 'formik';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux';
import { ProjectNote } from '../../../../API/interfaces/ProjectNote';
import postProjectComment from '../../../../API/Requests/Projects/PostProjectComment';
import { AlertActionCreators } from '../../../../Redux';
import { State } from '../../../../Redux/reducers';
import NoteListItem from '../../../Library/Tickets/NoteListItem';

const ProjectChat: React.FC = () => {
    const dispatch = useDispatch();
    const { fireAlert, hideAlert } = bindActionCreators(AlertActionCreators, dispatch);
    const [ chosenNotes, setChosenNotes ] = useState<ProjectNote[]>([])
    const [ allNotes, setAllNotes ] = useState<ProjectNote[]>([])
    const focusedProject = useSelector((state: State) => state.focusedProject);
    const sessionState = useSelector((state: State) => state.session);
    const socketState = useSelector((state: State) => state.socket);
    
    useEffect(() => {
        if (socketState) {
            socketState.on('newProjectNote', (note: ProjectNote) => {
            setAllNotes((previousState) => [...previousState, note]);
            constructVisibleNotes()
          });
        }
      }, [socketState]);

    useEffect(() => {
        async function getProjectComments(){
            let response = await fetch('/projects/getProjectComments', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
                }).then((r) => r.json().then((data) => ({ status: r.status, body: data })));
                if(response.status !== 200){
                    fireAlert({
                        isOpen: true,
                        status: response.status,
                        message: response.body.message,
                      });
                      return setTimeout(hideAlert, 6000);
                }
            return setAllNotes(response.body);
        }
        getProjectComments()
    }, [])

    function constructVisibleNotes() {
        let newNotes: ProjectNote[] = []
        let currentProject = sessionState.currentTeam.projects.find((project: any) => {
            if(project.name === focusedProject.name){
                return true
            }
        })
        allNotes.forEach((note: ProjectNote) => {
            if(note.project_id === currentProject.project_id){
                newNotes.push(note)
            }
        })
        newNotes.sort((a: ProjectNote, b: ProjectNote) => {
            return a.comment_id - b.comment_id
        })
        newNotes.reverse()
        setChosenNotes(newNotes)
    }
    useEffect(() => {
        if(focusedProject.name === 'All'){
            return setChosenNotes([])
        }
        constructVisibleNotes()
    }, [focusedProject, allNotes])

    if(focusedProject.name === 'All'){
        return (
        <div className='projectNoteListContainer' style={{ transition: '0' }} >
            <div
              id='list'
              className='ticketNoteList list'
              style={{ 
                color: 'white',
                textAlign: 'center',
                paddingBottom: '10px',
                transition: '0',
                height: '339px', 
                border: 'none'}}
            >
            <p style={{marginBottom: 'auto', marginTop: '24px'}}>
            Select a project to start collaborating in real time
            </p>
            </div>
            <div style={{height: '60px', backgroundColor: '#222222'}}></div>
        </div>
        )
    }else {
        return (
            <div
              className='projectNoteListContainer '
              style={{ transition: '0' }}
            >
              {chosenNotes.length > 0 ? (
                <div
                  id='list'
                  className='ticketNoteList list '
                  style={{ 
                    color: '#ffffff31',
                    textAlign: 'center',
                    paddingBottom: '10px',
                    transition: '0',
                    height: '339px'}}
                >
                {chosenNotes.map((projectNote: ProjectNote) => (
                <NoteListItem note={projectNote} />
                ))}
                </div>
              ) : (
                <div
                  className='list ticketNoteList'
                  style={{
                    color: '#ffffff31',
                    textAlign: 'center',
                    paddingBottom: '10px',
                    transition: '0',
                    height: '339px'
                  }}
                >
                  <p className='delayedFadeIn'>{`There are no comments for this project yet`}</p>
                </div>
              )}
    
              <Formik
                initialValues={{ note: '' }}
                onSubmit={(data, { resetForm }) => {
                  async function handleNoteSubmit(note: string) {
                    if (note.length > 300) {
                      fireAlert({
                        isOpen: true,
                        status: 0,
                        message: 'Too many characters...',
                      });
                      return setTimeout(hideAlert, 6000);
                    }
                    if (note.length < 1) {
                      fireAlert({
                        isOpen: true,
                        status: 0,
                        message: 'Empty comments not allowed...',
                      });
                      return setTimeout(hideAlert, 6000);
                    }
                    let response = await postProjectComment(
                      data.note,
                      focusedProject.name
                    );
                    let project_id: number 
                    if(focusedProject.name !== 'All'){
                        console.log(focusedProject.name)
                        project_id =  sessionState.currentTeam.projects.find((project: any) => project.name === focusedProject.name).project_id
                    } else {
                        project_id = -1
                    }
                    if (response.status === 200) {
                      let newProjectNoteToEmit: ProjectNote = {
                        comment_id: response.body.insertID,
                        author_username: sessionState.currentUser.username,
                        author_discriminator: sessionState.currentUser.discriminator,
                        body: note,
                        project_id: project_id,
                        date_created: moment()
                          .add(4, 'hours')
                          .format()
                          .slice(0, 19)
                          .split('T')
                          .join(' '),
                      };
                      console.log(newProjectNoteToEmit)
                      socketState.emit('newProjectNote', newProjectNoteToEmit);
                      setAllNotes((previousState) => [
                        ...previousState,
                        newProjectNoteToEmit
                      ]);
                      resetForm();
                    } else {
                      fireAlert({
                        isOpen: true,
                        status: response.status,
                        message: response.body.message,
                      });
                      setTimeout(hideAlert, 6000);
                    }
                  }
                  return handleNoteSubmit(data.note);
                }}
              >
                {({
                  values,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  handleReset,
                }) => {
                  return (
                    <form
                      className='form '
                      style={{ width: '100%',backgroundColor: '#222222', paddingBottom: '10px' }}
                      onSubmit={handleSubmit}
                      onBlur={handleBlur}
                    >
                      <div className='ticketNoteForm'>
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
                  );
                }}
              </Formik>
            </div>
        )
    }
}


export default ProjectChat