import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../../Redux/reducers';
import ProjectMembersListItem from './ProjectMembersListItem'
import plus from '../../Images/Icons/plus-lg.svg';
import ProjectPotentialMembersListItem from './ProjectPotentialMembersListItem';
import { Teammate } from '../../../API/interfaces/teammate';
let deepClone = require('lodash.clonedeep')

export default function ProjectMembersList() {
    const [members, setMembers] = useState([]);
    const [teamMates, setTeamMembers] = useState([]);
    const [addedMembers, setAddedMembers] = useState<Teammate[]>([]);
    const [potentialProjectMembers, setPotentialProjectMembers] = useState([]);
    const [isAddingMembers, setIsAddingMembers] = useState(false)
    const [canUserManageMembers, setCanUserManageMembers] = useState(false);
    const [isDirty, setIsDirty] = useState<boolean>(false)
    const sessionState = useSelector((state: State) => state.session)
    const focusedProjectState = useSelector((state: State) => state.focusedProject)
    //was shallow copying session state so any changes to the copy also changed the state
    let projects = deepClone(sessionState.currentTeam?.projects)
    let isPotentialProjectMembersEmpty: boolean = potentialProjectMembers.length < 1

    //this useEffect populates the membersList depending on which project option is selected
    useEffect(() => {
        function createProjectMembersList(projects: any){
            //focusedProjectState defaults to All
            if(focusedProjectState.name === 'All'){
                let newMembersList: any = [];
                projects.forEach((project: any) => project.project_members.forEach((member: any) => {
                    let index = newMembersList.findIndex((object: any) => {
                        return object.username === member.username
                    })
                    if(index !== -1){
                        if(member.role_id < newMembersList[index].role_id){
                            newMembersList[index].role_id = member.role_id 
                        }
                    } else {
                        newMembersList.push(member)
                    }
                }))
                return setMembers(newMembersList)
            } else {
                let newMembersList: any = [];
                let project = projects.find((project: any) => project.name === focusedProjectState.name)
                project?.project_members.forEach((member: any) => newMembersList.push(member))

                if(project.role_id === 2 || project.role_id === 1){
                    setCanUserManageMembers(true);
                } else {
                    setCanUserManageMembers(false);
                }
                setIsAddingMembers(false)
                return setMembers(newMembersList)
            }
        }
        createProjectMembersList(projects)
    }, [focusedProjectState])

    //This function and useEffect hook handle the process of opening the menu for Adding Members to project 
    async function setIsAddMemberMenuOpen(){
        let response: any = fetch('/projects/getUsersOnTeam', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        setIsAddingMembers(true)
        return setTeamMembers(await response)
    }
    useEffect(() => {
        function createPotentialProjectMembersList(projects: any){
            let potentialProjectMembersList: any = []
            if(teamMates[0] !== undefined && focusedProjectState.name !== 'All'){
                let project = projects.find((project: any) => {
                    return project.name === focusedProjectState.name
                })
                teamMates.forEach((mate: any) => {
                    let idx = project.project_members.findIndex((member: any) => {
                        return member.username === mate.username && 
                        member.discriminator === mate.discriminator ?
                        true : false;
                    });
                    if(idx === -1){
                        potentialProjectMembersList.push(mate)
                    }
                })
            }
            isPotentialProjectMembersEmpty = createPotentialProjectMembersList.length < 1
            return setPotentialProjectMembers(potentialProjectMembersList)
        }
        return createPotentialProjectMembersList(projects);
    }, [teamMates])

    useEffect(() => {setIsDirty(addedMembers.length > 0)}, [addedMembers])

    function handleCloseAddMembersMenu(){
        setPotentialProjectMembers([]);
        setAddedMembers([]);
        setIsAddingMembers(false);
    }

    let isFocusedProjectAll = focusedProjectState.name === 'All'
    function getIsManageableProject() {
        if(isFocusedProjectAll !== true && canUserManageMembers === true){
            return true
        } else {
            return false
        }
    }
    let manageableProjectMembers = getIsManageableProject()

    function handleToggleMemberBeingAdded(member: Teammate){
        console.log(member)
        let idx = addedMembers.findIndex((addedMember: Teammate) => {
            return addedMember.username === member.username && addedMember.discriminator === member.discriminator
        })
        if(idx === -1){
            let newAddedGroup: Teammate[] = deepClone(addedMembers)
            newAddedGroup.push(member)
            return setAddedMembers(newAddedGroup)
        }else{
            let newAddedGroup: Teammate[] = deepClone(addedMembers)
            newAddedGroup.splice(idx, 1)
            return setAddedMembers(newAddedGroup)
        }
    }

    function handleSubmitAddedMembers(){
        console.log('tittie')
    }

    return (
        <>
            {isAddingMembers ? 
                <>
                <div className='listRow userDetailsRow fadeIn'  onClick={() => {handleCloseAddMembersMenu()}} style={{marginTop: '5px', width: 'calc(100% - 20px)', justifyContent: 'center'}}>      
                    <div className='fadeIn' style={{textAlign: 'center', width: 'fit-content', marginBottom: '10px'}}>
                        <span style={{color: 'rgb(239, 255, 10)'}}>
                            Back to Members List
                        </span>
                    </div>
                </div>
                <div id='list'  className='list projectMembersList componentGlow fadeIn'>
                    {isPotentialProjectMembersEmpty ? 
                    <p className='delayedFadeIn' style={{color: 'white'}}>{`Everyone is already on the ${focusedProjectState.name} project...`}</p>:<></>}
                    {potentialProjectMembers.map((member: any, index: any) =>
                        //docs say its not ideal to use the index for the key
                        //however it is necessary here
                        <ProjectPotentialMembersListItem key={index} member={member} setIsMemberOnList={handleToggleMemberBeingAdded} /> 
                    )}
                </div>

                {isDirty ? 
                <button className='button userDetailsButton fadeIn' onClick={handleSubmitAddedMembers} style={{opacity: '100%'}}>
                    Submit Changes
                </button>       
                :<></>}
                </>
            :
                <>
                <div className='listRow' style={{marginTop: '5px', width: 'calc(100% - 20px)'}}>      
                    <div className='memberListRowSection fadeIn' style={{textAlign: 'left'}}>
                        <span className='rowItem'>
                            Member
                        </span>
                    </div>
                    <div className='memberListRowSection fadeIn' style={{textAlign: 'center'}}>
                        <span className='rowItem'>
                            Project Role
                        </span>
                    </div>
                </div>
                <div id='list'  className='list projectMembersList componentGlow fadeIn'>
                    {members.map((member: any, index: any) =>
                        //docs say its not ideal to use the index for the key
                        //however here it is necessary 
                        <ProjectMembersListItem key={index} member={member} /> 
                    )}
                </div>

                {manageableProjectMembers ? 
                <div className='addMemberButton scaleYonHover' onClick={setIsAddMemberMenuOpen}>
                    <img src={plus} style={{marginLeft: '10px', marginRight: '10px'}}/>
                    <p style={{margin: '5px 10px 5px 0px'}}>{`Add Teammates to ${focusedProjectState.name}`}</p>
                </div>
                :
                <div className='addMemberButton scaleYonHover' style={{height: '27px'}}></div>
                }
                </>
            }   
        </>
    )
}
    


