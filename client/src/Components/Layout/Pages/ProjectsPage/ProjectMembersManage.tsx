import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FocusedMemberActionCreators } from '../../../../Redux';
import { State } from '../../../../Redux/reducers';
import { translateRole } from '../../../../Services/translateRole';
import ProjectMembersList from '../../../Library/Projects/ProjectMembersList'
import UpdateUserProjectRole from '../../../Library/Projects/UpdateUserProjectRole'
import { Box, Modal } from '@mui/material';
let deepClone = require('lodash.clonedeep')

export default function ProjectMembersManage(){
    const focusedMemberState = useSelector((state: State) => state.focusedMember)
    const sessionState = useSelector((state: State) => state.session)
    const [isMemberSelected, setIsMemberSelected] = useState(focusedMemberState.username !== '');
    const focusedProjectState = useSelector((state: State) => state.focusedProject)
    const [isDirty, setIsDirty] = useState(false)
    const [memberDetails, setMemberDetails] = useState<any[]>([])
    const dispatch = useDispatch();
    const { updateFocusedMember } = bindActionCreators(FocusedMemberActionCreators, dispatch)
    const [word, setWord] = useState('Update')
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(()  => setIsMemberSelected(!isMemberSelected), [focusedMemberState])
    useEffect(() => {  
        async function getMemberDetails(){
            let response: any = fetch('/projects/getRelatedMemberDetails', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
            return setMemberDetails(await response)
        }
        getMemberDetails()
    },[])

    function handleCloseUserDetailsForm() {
        setIsDirty(false)
        updateFocusedMember({username: '', discriminator: 0}) 
    }
        
    
    if(isDirty === true){
        document.getElementById('manageUsersButton')?.classList.add('active')
    } else {
        document.getElementById('manageUsersButton')?.classList.remove('active')
    }

    let focusedMemberDetails = memberDetails.find((member: any) => {
        if(member.username === focusedMemberState.username && member.discriminator === focusedMemberState.discriminator){
            return true
        }else {
            return false
        }
    })
    
    let isFocusedProjectAll: boolean = (focusedProjectState.name === 'All')
    let focusedProjectOfFocusedMember: any = undefined
    let date: any = ''
    let role: any= ''
    let enlistedByUsername: string = '';
    let enlistedByDiscriminator: string = '';
    if(focusedMemberDetails !== undefined){
        if(isFocusedProjectAll){
            //since team_role is determined by your highest project_role, this works
            role = translateRole.TranslateProjectRole(focusedMemberState.role_id)
            enlistedByUsername = ''
            enlistedByDiscriminator = ''
        } else {
            focusedProjectOfFocusedMember = focusedMemberDetails?.memberProjects.find((member: any) => {
                if(member.project_name === focusedProjectState.name){
                    return true
                } else {
                    return false
                }
            })
            if(focusedProjectOfFocusedMember !== undefined){
                let roleID = focusedProjectOfFocusedMember.project_role
                date = focusedProjectOfFocusedMember.date_assigned.toString().substring(0, 10)
                enlistedByUsername = focusedProjectOfFocusedMember.assignedByUsername
                enlistedByDiscriminator = focusedProjectOfFocusedMember.assignedByDiscriminator
                role = translateRole.TranslateProjectRole(roleID)
            } else{
                role = `${focusedMemberState.username} is not on the ${focusedProjectState.name} project`
            }
        }
    }

    async function handleSubmit(){
        if(word !== 'Update'){
            let updateUser = {
                username: focusedMemberState.username,
                discriminator: focusedMemberState.discriminator,
                targetProjectName: focusedProjectState.name,
                newRoleId: translateRole.TranslateProjectRoleBack(word)
            }
            let response: any = fetch('/projects/updateMemberRole', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateUser)
            }).then(res => res.json())
            return console.log(await response)
        }
    }

    async function handleRemoveMember(){
        let targetUserProject = {
            username: focusedMemberState.username,
            discriminator: focusedMemberState.discriminator,
            project: focusedProjectState.name
        }
        let response: any = fetch('/projects/removeMember', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(targetUserProject)
        }).then(res => res.json())
        return console.log(await response)
    }

    let currentUserProjects = deepClone(sessionState.currentTeam.projects)
    let focusedProject = currentUserProjects.find((project: any)=>{
        if(project.name === focusedProjectState.name){return true}})

    let isUserAllowedToEditRole = false;
    if(focusedProject && focusedProjectOfFocusedMember){
        isUserAllowedToEditRole = focusedProject.role_id < focusedProjectOfFocusedMember.project_role;
    }
    //if the focused project is all or undefined, we wont render a few of the details rows
    //because 'all' wouldnt hold relevant info and undefined means the user isnt on that project
    let isFocusedMemberProjectAllOrUndefined = (isFocusedProjectAll === true || focusedProjectOfFocusedMember === undefined)
    return(
        <div className='ManageMembersWidget ' >
            {isMemberSelected ?
            <ProjectMembersList />
            :
            <>
                <div className='listRow userDetailsRow' onClick={handleCloseUserDetailsForm} style={{marginTop: '5px', width: 'calc(100% - 20px)', justifyContent: 'center'}}>
                    <div className='memberListRowSection fadeIn' style={{textAlign: 'left', width: 'fit-content'}}>
                        <span className='rowItem' style={{color: '#efff0a'}}>
                            Back to Members List
                        </span>
                    </div>
                </div>
                <div id='list'  className='list projectMembersList componentGlow fadeIn' style={{position: 'relative'}}>
                    <div className='ListContainer'>
                        <div className='listItem listRow memberRow manageMemberListRow' style={{justifyContent: 'space-between'}}>
                            <div className='memberListRowSection' style={{textAlign: 'left'}}>
                                <span className='rowItem username' style={{display: 'inline-block', width: 'fit-content'}}>
                                    {focusedMemberState.username}
                                </span>
                                <span className='rowItem discriminator' style={{display: 'inline-block', width: 'fit-content'}}>
                                    #{focusedMemberState.discriminator}
                                </span>
                            </div>
                        </div>
                        {focusedProjectState.name !== 'All' && 
                        <div className='listItem listRow memberRow manageMemberListRow' style={{justifyContent: 'space-between'}}>
                            <div className='memberListRowSection' style={{textAlign: 'left'}}>
                                <span className='rowItem username' style={{display: 'inline-block', width: 'fit-content'}}>
                                    {role}
                                </span>
                            </div>
                            {isUserAllowedToEditRole ? 
                            <UpdateUserProjectRole setIsFormDirty={setIsDirty} isFormDirty={isDirty} word={word} setWord={setWord}/>
                            :<></>}
                        </div>}

                        {isFocusedMemberProjectAllOrUndefined ? <></> : 
                        <>
                            <div className='listItem listRow memberRow manageMemberListRow' style={{justifyContent: 'space-between'}}>      
                                <div className='memberListRowSection' style={{textAlign: 'left'}}>
                                    <span className='rowItem username' style={{display: 'inline-block', width: 'fit-content'}}>
                                        Enlisted by 
                                    </span>
                                    <span className='rowItem username' style={{display: 'inline-block', width: 'fit-content'}}>
                                        {`\u00A0${enlistedByUsername}`}  
                                    </span>
                                    <span className='rowItem' style={{display: 'inline-block', width: 'fit-content', opacity: '30%', fontSize: '11px'}}>
                                        #{enlistedByDiscriminator}  
                                    </span>        
                                </div>
                            </div>
                            <div className='listItem listRow memberRow manageMemberListRow ' style={{justifyContent: 'space-between'}}>
                            <div className='memberListRowSection' style={{textAlign: 'left'}}>
                                <span className='rowItem username' style={{display: 'inline-block', width: 'fit-content'}}>
                                    Joined this project 
                                </span>
                                <span className='rowItem username' style={{display: 'inline-block', width: 'fit-content'}}>
                                    {`\u00A0on\u00A0${date}`}
                                </span>
                                </div>
                            </div>
                            {isUserAllowedToEditRole ?
                            <div className='removeMemberButton' >
                                <p style={{marginRight: '10px', cursor: 'pointer'}}>Remove</p>
                                <svg onClick={() => setIsModalOpen(true)} xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-x-square" viewBox="0 0 16 16">
                                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                </svg>
                            </div>
                            :<></>}
                            <Modal
                                open={isModalOpen}
                                style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <Box className='modalBoxContainer'>
                                        <div className='modalBox'>
                                            <p style={{color: 'white'}} onClick={() => setIsModalOpen(false)}>
                                                Are you sure you want to remove 
                                                <span className='rowItem username' style={{display: 'inline-block', width: 'fit-content', color: '#efff0a'}}>
                                                    {`\u00A0${focusedMemberState.username}`}
                                                </span>
                                                <span className='rowItem discriminator' style={{display: 'inline-block', width: 'fit-content', color: '#efff0a'}}>
                                                    #{`${focusedMemberState.discriminator}\u00A0`}
                                                </span>
                                                from the 
                                                <span className='rowItem' style={{display: 'inline-block', width: 'fit-content', color: '#efff0a'}}>
                                                    {`\u00A0${focusedProjectState.name}\u00A0`}
                                                </span>
                                                project?
                                            </p>
                                            <ul className='modalList'>
                                                <p>These effects will occur...</p>
                                                <li>{`Tickets assigned to ${focusedMemberState.username} in the ${focusedProjectState.name} project will be set to "Unassigned"`}</li>
                                                <li>{`${focusedMemberState.username} can no longer view the ${focusedProjectState.name} project's tickets`}</li>
                                                <li>{`${focusedMemberState.username} can no longer make tickets for the ${focusedProjectState.name} project`}</li>
                                                <li>{`${focusedMemberState.username} can no longer view the ${focusedProjectState.name} project's members list`}</li>
                                            </ul>
                                            <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                                                <button onClick={() => setIsModalOpen(false)} className='button modalButton modalButtonCancel' >Cancel</button>
                                                <button onClick={() => handleRemoveMember()} className='button modalButton modalButtonConfirm' >Confirm</button>
                                            </div>
                                        </div>
                                        
                                    </Box>
                            </Modal>
                        </>
                        }
                    </div>
                </div>
            </>
            }
        {isMemberSelected ? <></> : 
        <button id='manageUsersButton' className='button userDetailsButton' onClick={handleSubmit}>Submit Changes</button>       
        }
        </div>
    )
}