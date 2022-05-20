import React from 'react';
import { Formik } from 'formik';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import postNewTeam from '../../../API/Requests/PostNewTeam';

export default function NewTeamForm() {
    let navigate = useNavigate();
    
    async function handleSubmit(data: any) {
        console.log(data); 
        let attemptResult = await postNewTeam(data)
        console.log(attemptResult)
        if(attemptResult === 200){
            navigate('/selectTeam')
        }
}
    
return( 
        <div>
            <h4 className='header'>Create Team</h4>
            <Formik 
                initialValues={{name: ''}}
                onSubmit={handleSubmit}
            >
            {({values, handleChange, handleBlur, handleSubmit, handleReset}) => {
                    return (
                        <form onSubmit={handleSubmit} onBlur={handleBlur}>
                        <div className='formContainer'>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <TextField
                                    label='Team Name'
                                    type='text'
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className='formComponent'
                                    style={{width: '100%'}}
                                    name='name'
                                    variant='standard'
                                    color='info'
                                    required />
                        </div>
                        </div>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'right' }}>
                            <button type='reset'
                                onClick={handleReset}
                                className='button bottomButtons cancelButton'
                                style={{ margin: '2px 2px 0px 0px' }}>
                                X
                            </button>
                            <button type='submit'
                                name='submit'
                                className='button bottomButtons submitButton' 
                                style={{
                                    borderRadius: '5px 0px 5px 5px',
                                    margin: '2px 0px 0px 0px'
                                }}>
                                Submit
                            </button>
                        </div>
                        </form>
                    );
                }}
            </Formik>
        </div>
    )
}