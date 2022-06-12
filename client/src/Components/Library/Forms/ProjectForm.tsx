import React, { useRef } from 'react';
import { Formik, FormikValues } from 'formik';
import { TextField } from '@mui/material';
import postProject from '../../../API/Requests/Projects/PostProject';

interface Props{
    isExtended: boolean
}

export default function ProjectForm(props: Props) {
    const formRef = useRef<FormikValues>() as any;

    const handleReset = () => {
        if(formRef.current ){
            formRef.current.handleReset()
        }
    }
    props.isExtended ? console.log('all g') : handleReset()
return(
        <>
            <Formik 
                initialValues={{name: '',
                                description: ''}}
                onSubmit={data => {
                    console.log(data) 
                    postProject(data)
                }}
                innerRef={formRef}
            >
            {({values, handleChange, handleBlur, handleSubmit, handleReset}) => {
                    return (
                        <form className='delayedFadeIn form' style={{width: 'fit-content'}} onSubmit={handleSubmit} onBlur={handleBlur}>
                            
                        <div className='formContainer' >
                            <h4 className='header'>New Project</h4>
                            <TextField
                                label='Name'
                                type='text'
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className='formComponent'
                                name='name'
                                variant='standard'
                                color='info'
                                required />
                            <TextField 
                                name='description' 
                                value={values.description} 
                                label='Description' 
                                className='formComponent' 
                                color='info' 
                                variant='standard' 
                                onChange={handleChange} 
                                onBlur={handleBlur} 
                                required />
                        </div>
                        <div className='formButtonsContainer'>
                            <button type='reset'
                                onClick={e => {
                                    handleReset(e)
                                }}
                                className='button bottomButton bottomButtons cancelButton'
                                style={{ margin: '2px 2px 0px 0px' }}>
                                X
                            </button>
                            <button type='submit'
                                name='submit'
                                className='button bottomButton bottomButtons submitButton' 
                                style={{
                                    margin: '2px 0px 0px 0px'
                                }}>
                                Submit
                            </button>
                        </div>
                        </form>
                    )}
                }
            </Formik>
        </>
    )
}








