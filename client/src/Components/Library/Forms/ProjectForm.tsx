import React, { Dispatch, SetStateAction, useRef } from 'react';
import { Formik, FormikValues } from 'formik';
import { TextField } from '@mui/material';
import postProject from '../../../API/Requests/Projects/PostProject';
import { bindActionCreators } from 'redux';
import { AlertActionCreators } from '../../../Redux';
import { useDispatch } from 'react-redux';

interface Props{
    isExtended: boolean,
    setIsExtended: Dispatch<SetStateAction<boolean>>
}

export default function ProjectForm(props: Props) {
    const dispatch = useDispatch();
    const { fireAlert, hideAlert } = bindActionCreators(AlertActionCreators, dispatch)

    return(
        <>
            <Formik 
                initialValues={{name: '',
                                description: ''}}
                onSubmit={data => {
                    (async () => {
                        if(data.name.length > 50){
                            fireAlert({
                                isOpen: true,
                                status: 0,
                                message: 'Max name length is 50 characters...'
                            })
                            setTimeout(hideAlert, 6000)
                            return 
                        } else if (data.description.length > 1000){
                            fireAlert({
                                isOpen: true,
                                status: 0,
                                message: 'Max description length is 1000 characters...'
                            })
                            setTimeout(hideAlert, 6000)
                            return 
                        } else {
                            let response = await postProject(data)
                            response.status !== 200 ? 
                                (()=> {
                                    console.log('asda;skjd')
                                    fireAlert({
                                        isOpen: true,
                                        status: response.status,
                                        message: response.body.message
                                    })
                                    setTimeout(hideAlert, 6000);
                                })()
                                : (()=>{
                                    console.log('a ok')
                                })() 
                        }
                    })() 
                }}
            >
            {({values, handleChange, handleBlur, handleSubmit, resetForm}) => {
                    return (
                        <form className='delayedFadeIn form' style={{width: 'fit-content'}} onSubmit={handleSubmit} onBlur={handleBlur}>
                            
                        <div className='formContainer' >
                            <h4 className='header'>New Project</h4>
                            <TextField
                                label='Name'
                                type='text'
                                value={values.name}
                                onChange={(e)=>handleChange(e)}
                                onBlur={handleBlur}
                                className='formComponent'
                                name='name'
                                variant='standard'
                                color='info'
                                required />
                            <TextField 
                                name='description' 
                                type='text'
                                value={values.description} 
                                label='Description' 
                                className='formComponent' 
                                color='info' 
                                variant='standard' 
                                onChange={(e)=>handleChange(e)} 
                                onBlur={handleBlur} 
                                required />
                        </div>
                        <div className='formButtonsContainer'>
                            <button type='reset'
                                onClick={()=>{resetForm(); props.setIsExtended(false)}}
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








