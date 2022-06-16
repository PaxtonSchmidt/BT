import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FocusedMemberActionCreators } from '../../../../Redux';
import { State } from '../../../../Redux/reducers';
import TranslateTeamRole from '../../../../Services/RoleTranslator';
import ProjectMembersList from '../../../Library/Projects/ProjectMembersList'
import UpdateUserProjectRole from '../../../Library/Projects/UpdateUserProjectRole';
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

    let handleCloseUserDetailsForm = () => updateFocusedMember({username: '', discriminator: 0}) 
    
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
            role = TranslateTeamRole(focusedMemberState.role_id)
            enlistedByUsername = 'N/A'
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
                
                console.log(focusedProjectOfFocusedMember)
                date = focusedProjectOfFocusedMember.date_assigned.toString().substring(0, 10)
                enlistedByUsername = focusedProjectOfFocusedMember.assignedByUsername
                enlistedByDiscriminator = focusedProjectOfFocusedMember.assignedByDiscriminator
                role = TranslateTeamRole(roleID)
            } else{
                role = `${focusedMemberState.username} is not on the ${focusedProjectState.name} project`
            }
        }
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
                        <div className='listItem listRow memberRow manageMemberListRow' style={{justifyContent: 'space-between'}}>
                            <div className='memberListRowSection' style={{textAlign: 'left'}}>
                                <span className='rowItem username' style={{display: 'inline-block', width: 'fit-content'}}>
                                    {role}
                                </span>
                            </div>
                            {isUserAllowedToEditRole ? 
                            <UpdateUserProjectRole />
                            :<></>}
                        </div>

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
                                    Assigned to the {focusedProjectState.name} project
                                </span>
                                <span className='rowItem username' style={{display: 'inline-block', width: 'fit-content'}}>
                                    {`\u00A0on\u00A0${date}`}
                                </span>
                                </div>
                            </div>
                        </>
                        }

                        
                        
                    </div>
                    <button id='manageUsersButton' className='button userDetailsButton' style={{right: '10px', bottom: '10px', position: 'absolute'}}>Submit Changes</button>       
                </div>
            </>
            }
        </div>
    )
}