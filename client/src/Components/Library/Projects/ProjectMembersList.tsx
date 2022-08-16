import React, { SetStateAction, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../../Redux/reducers';
import ProjectMembersListItem from './ProjectMembersListItem';
import plus from '../../Images/Icons/plus-lg.svg';
import ProjectPotentialMembersListItem from './ProjectPotentialMembersListItem';
import { Teammate } from '../../../API/interfaces/teammate';
import postNewProjectMembers from '../../../API/Requests/Projects/PostNewProjectMembers';
import { bindActionCreators } from 'redux';
import { AlertActionCreators, SessionActionCreators } from '../../../Redux';
import { addMembersToAProjectInSession } from '../../../Redux/action-creators/sessionActionCreators';
import alertDispatcher from '../../../API/Requests/AlertDispatcher';
import { BreakPoints } from '../Breakpoints';
import arrow from '../../Images/Icons/arrow-up-short.svg';
let deepClone = require('lodash.clonedeep');

interface Props{
  setIsProjectChatOpen: React.Dispatch<SetStateAction<boolean>>
}

export default function ProjectMembersList(props: Props) {
  let dispatch = useDispatch();
  const { fireAlert, hideAlert } = bindActionCreators(
    AlertActionCreators,
    dispatch
  );
  const { addMembersToAProjectInSession } = bindActionCreators(
    SessionActionCreators,
    dispatch
  );
  const [members, setMembers] = useState<any[]>([]);
  const [teamMates, setTeamMembers] = useState([]);
  const [addedMembers, setAddedMembers] = useState<Teammate[]>([]);
  const [potentialProjectMembers, setPotentialProjectMembers] = useState<any[]>(
    []
  );
  const [isAddingMembers, setIsAddingMembers] = useState(false);
  const [canUserManageMembers, setCanUserManageMembers] = useState(false);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const sessionState = useSelector((state: State) => state.session);
  const focusedProjectState = useSelector(
    (state: State) => state.focusedProject
  );
  const teammatesState = useSelector((state: State) => state.teammates);
  //was shallow copying session state so any changes to the copy also changed the state
  let projects = deepClone(sessionState.currentTeam?.projects);
  let teammates = deepClone(teammatesState);
  let isPotentialProjectMembersEmpty: boolean =
    potentialProjectMembers.length < 1;
  //this useEffect populates the membersList depending on which project option is selected
  function createProjectMembersList(projects: any) {
    //focusedProjectState defaults to All
    if (focusedProjectState.name === 'All') {
      let newMembersList: any = [];
      projects.forEach((project: any) =>
        project.project_members.forEach((member: any) => {
          let index = newMembersList.findIndex((object: any) => {
            return object.username === member.username;
          });
          if (index !== -1) {
            if (member.role_id < newMembersList[index].role_id) {
              newMembersList[index].role_id = member.role_id;
            }
          } else {
            newMembersList.push(member);
          }
        })
      );
      return setMembers(newMembersList);
    } else {
      let newMembersList: any = [];
      let project = projects.find(
        (project: any) => project.name === focusedProjectState.name
      );
      project?.project_members.forEach((member: any) =>
        newMembersList.push(member)
      );

      if (project.role_id !== undefined &&
        (project.role_id === 2 ||
        project.role_id === 1 ||
        sessionState.currentTeam.team_role === 1)
      ) {
        setCanUserManageMembers(true);
      } else {
        setCanUserManageMembers(false);
      }
      setIsAddingMembers(false);
      return setMembers(newMembersList);
    }
  }
  useEffect(() => {
    createProjectMembersList(projects);
  }, [focusedProjectState]);

  //This function and useEffect hook handle the process of opening the menu for Adding Members to project
  async function setIsAddMemberMenuOpen() {
    setTeamMembers(teammates);
    setIsAddingMembers(true);
  }
  useEffect(() => {
    function createPotentialProjectMembersList(projects: any) {
      let potentialProjectMembersList: any = [];
      if (teamMates[0] !== undefined && focusedProjectState.name !== 'All') {
        let project = projects.find((project: any) => {
          return project.name === focusedProjectState.name;
        });
        teamMates.forEach((mate: any) => {
          let idx = project.project_members.findIndex((member: any) => {
            return member.username === mate.username &&
              member.discriminator === mate.discriminator
              ? true
              : false;
          });
          if (idx === -1) {
            potentialProjectMembersList.push(mate);
          }
        });
      }
      isPotentialProjectMembersEmpty =
        createPotentialProjectMembersList.length < 1;
      return setPotentialProjectMembers(potentialProjectMembersList);
    }
    return createPotentialProjectMembersList(projects);
  }, [teamMates]);

  useEffect(() => {
    setIsDirty(addedMembers.length > 0);
  }, [addedMembers]);

  function handleCloseAddMembersMenu() {
    setPotentialProjectMembers([]);
    setAddedMembers([]);
    setIsAddingMembers(false);
  }

  let isFocusedProjectAll = focusedProjectState.name === 'All';
  function getIsManageableProject() {
    if (isFocusedProjectAll !== true && canUserManageMembers === true) {
      return true;
    } else {
      return false;
    }
  }
  let manageableProjectMembers = getIsManageableProject();

  function handleToggleMemberBeingAdded(member: Teammate) {
    let idx = addedMembers.findIndex((addedMember: Teammate) => {
      return (
        addedMember.username === member.username &&
        addedMember.discriminator === member.discriminator
      );
    });
    if (idx === -1) {
      let newAddedGroup: Teammate[] = deepClone(addedMembers);
      newAddedGroup.push(member);
      return setAddedMembers(newAddedGroup);
    } else {
      let newAddedGroup: Teammate[] = deepClone(addedMembers);
      newAddedGroup.splice(idx, 1);
      return setAddedMembers(newAddedGroup);
    }
  }
  async function handleSubmitAddedMembers() {
    async function submitMembersList() {
      let response = await postNewProjectMembers(
        addedMembers,
        focusedProjectState.name
      );
      if(!response.isOk){
        alertDispatcher(fireAlert, response.error, hideAlert);
      } else {
        let project = projects.find(
          (project: any) => project.name === focusedProjectState.name
        );
        let defaultProjectRole_id = 3; //dev role
        let newMembers: any[] = [];
        let newPotentialMembersList: any[] = [...potentialProjectMembers];
        addedMembers.forEach((member: any) => {
          newMembers.push({
            username: member.username,
            discriminator: member.discriminator,
            role_id: defaultProjectRole_id,
            project_id: project.project_id,
          });
          let idx = newPotentialMembersList.findIndex(
            (potentialMember: any) => {
              if (
                member.username === potentialMember.username &&
                member.discriminator === potentialMember.discriminator
              ) {
                return true;
              }
            }
          );
          newPotentialMembersList.splice(idx, 1);
        });
        let newMembersList = [...members, ...newMembers];
        addMembersToAProjectInSession(newMembers);
        setMembers(newMembersList);
        setPotentialProjectMembers(newPotentialMembersList);
        setAddedMembers([]);
        setIsAddingMembers(false);
      }
    }
    submitMembersList();
  }

  const windowWidth = useSelector((state: State) => state.windowSize) | window.innerWidth

  return (
    <>
      {isAddingMembers ? (
        <>
          <div
            className='listRow userDetailsRow fadeIn'
            onClick={() => {
              handleCloseAddMembersMenu();
            }}
            style={{
              marginTop: '5px',
              width: 'calc(100% - 20px)',
              justifyContent: 'center',
            }}>
            <div
              className='fadeIn'
              style={{
                textAlign: 'center',
                width: 'fit-content',
                marginBottom: '10px'
              }}>
              
              <span style={{position: 'relative', cursor: 'pointer'}}>
                <span style={{color: 'white', width: '100%', textAlign: 'center', marginTop: '10px', cursor: 'pointer', fontSize: '14px'}}>
                  Available Teammates:
                </span>
                <img
                  src={arrow}
                  className={`delayedFadeIn`}
                  style={{height: '25px',  width: '25px', paddingTop: '-20px', position: 'absolute', left: '-30px', transform: 'rotate(270deg) translateX(4px)'}}
                />
              </span>
            </div>
          </div>
          
          <div id='list' className='membersList componentGlow fadeIn'>
            {isPotentialProjectMembersEmpty ? (
              <p
                className='delayedFadeIn'
                style={{
                  color: 'white',
                  textAlign: 'center',
                }}>{`Everyone is already on the ${focusedProjectState.name} project...`}</p>
            ) : (
              <></>
            )}
            {potentialProjectMembers.map((member: any, index: any) => (
              //docs say its not ideal to use the index for the key
              //however it is necessary here
              <ProjectPotentialMembersListItem
                key={index}
                member={member}
                setIsMemberOnList={handleToggleMemberBeingAdded}
              />
            ))}
          </div>

          {isDirty ? (
            <button
              className='button userDetailsButton fadeIn'
              onClick={handleSubmitAddedMembers}
              style={{ opacity: '100%', cursor: 'pointer', width:'fit-content' }}>
              Submit Changes
            </button>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          <div
            className='listRow'
            style={{justifyContent: `${focusedProjectState.name === 'All' ? 'center' : 'space-between'}`, marginTop: `${focusedProjectState.name === 'All' ? '10px' : '5px'}`, width: 'calc(100% - 10px)', borderBottom: `${focusedProjectState.name === 'All' ? 'none' : ''}`, transition: '0s'}}>
            <div
              className='memberListRowSection fadeIn'
              style={{ textAlign: 'left' }}>
                {focusedProjectState.name === 'All' 
                ? <span className='rowItem'>Select a project to see its members</span>
                : <span className='rowItem'>Member</span>
                }
            </div>

            {focusedProjectState.name === 'All' 
            ? <></>
            : <div
            className='memberListRowSection fadeIn'
            style={{ textAlign: 'center', width: '100px' }}
            >
              <span className='rowItem'>Project Role</span>
          </div>}
          </div>

          <div
            id='list'
            className='list membersList componentGlow fadeIn'
            style={{ paddingRight: '0px' }}>
            {focusedProjectState.name !== 'All' 
            && members.map((member: any, index: any) => (
              //docs say its not ideal to use the index for the key
              //however here it is necessary
              <ProjectMembersListItem key={index} member={member} />
            ))}
          </div>

          
          {manageableProjectMembers ? (
            <div 
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                transition: '0s'
              }}
            >
              <div
                className=' scaleYonHover hoverGrey'
                style={{display: 'flex', flexDirection: 'row', borderRadius: '5px', color: 'white', whiteSpace: 'nowrap', paddingLeft: '5px', cursor: 'pointer'}}
                onClick={setIsAddMemberMenuOpen}>
                <img
                  src={plus}
                  style={{marginTop: '2px', marginRight:'5px', height: '27px', width: '20px', cursor: 'pointer'}}
                />
                <div
                  style={{
                    margin: '8px 10px 5px 0px',
                    overflowX: 'hidden',
                    maxWidth: '200px',
                    whiteSpace: 'nowrap', 
                    cursor: 'pointer'
                  }}>{`Add Members`}</div>
              </div>
              
              {windowWidth <= BreakPoints.mobile && focusedProjectState.name !== 'All'
              ?<div onClick={()=>props.setIsProjectChatOpen(true)} className='scaleYonHover hoverGrey' style={{borderRadius: '5px', color: 'white', paddingTop: '5px', paddingBottom: '5px', paddingLeft: '10px', paddingRight: '10px', whiteSpace: 'nowrap', display: 'flex', flexDirection:'row'}}>
                <svg xmlns="http://www.w3.org/2000/svg" style={{marginTop: '2px'}} width="16" height="16" fill="#efff0a" className="bi bi-chat-text" viewBox="0 0 16 16">
                  <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
                  <path d="M4 5.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8zm0 2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"/>
                </svg>
                <p style={{ marginTop: '2px', marginBottom: '0px' }}>
                  {'\u00a0'}Project Chat
                </p>
              </div>
              :<></>
              }
              
            </div>
          ) : (
            <div 
              
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around'
              }}
            >
              {windowWidth <= BreakPoints.mobile && focusedProjectState.name !== 'All'
              ?<div onClick={()=>props.setIsProjectChatOpen(true)} className='scaleYonHover hoverGrey' style={{borderRadius: '5px', color: 'white', paddingTop: '5px', paddingBottom: '5px', paddingLeft: '10px', paddingRight: '10px', whiteSpace: 'nowrap', display: 'flex', flexDirection:'row'}}>
                <svg xmlns="http://www.w3.org/2000/svg" style={{marginTop: '2px'}} width="16" height="16" fill="#efff0a" className="bi bi-chat-text" viewBox="0 0 16 16">
                  <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
                  <path d="M4 5.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8zm0 2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"/>
                </svg>
                <p style={{ marginTop: '2px', marginBottom: '0px' }}>
                  {'\u00a0'}Project Chat
                </p>
              </div>
              :<></>
              }
            </div>
          )}
        </>
      )}
    </>
  );
}
