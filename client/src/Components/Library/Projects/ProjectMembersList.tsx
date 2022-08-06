import React, { useEffect, useState } from 'react';
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
let deepClone = require('lodash.clonedeep');

export default function ProjectMembersList() {
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

      if (
        project.role_id === 2 ||
        project.role_id === 1 ||
        sessionState.currentTeam.team_role === 1
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
                marginBottom: '10px',
              }}>
              <span style={{ color: 'rgb(239, 255, 10)' }}>
                Back to Members List
              </span>
            </div>
          </div>
          <div id='list' className='list membersList componentGlow fadeIn'>
            {isPotentialProjectMembersEmpty ? (
              <p
                className='delayedFadeIn'
                style={{
                  color: 'white',
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
              style={{ opacity: '100%', cursor: 'pointer' }}>
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
            style={{ marginTop: '5px', width: 'calc(100% - 20px)' }}>
            <div
              className='memberListRowSection fadeIn'
              style={{ textAlign: 'left' }}>
              <span className='rowItem'>Member</span>
            </div>
            <div
              className='memberListRowSection fadeIn'
              style={{ textAlign: 'center', width: '100px' }}>
              {focusedProjectState.name === 'All' ? (
                <></>
              ) : (
                <span className='rowItem'>Project Role</span>
              )}
            </div>
          </div>
          <div
            id='list'
            className='list membersList componentGlow fadeIn'
            style={{ paddingRight: '0px' }}>
            {members.map((member: any, index: any) => (
              //docs say its not ideal to use the index for the key
              //however here it is necessary
              <ProjectMembersListItem key={index} member={member} />
            ))}
          </div>

          {manageableProjectMembers ? (
            <div
              className='addItemButton scaleYonHover'
              onClick={setIsAddMemberMenuOpen}>
              <img
                src={plus}
                style={{ marginLeft: '10px', marginRight: '10px' }}
              />
              <p
                style={{
                  margin: '5px 10px 5px 0px',
                  overflowX: 'hidden',
                  maxWidth: '200px',
                  whiteSpace: 'nowrap',
                }}>{`Add Members`}</p>
            </div>
          ) : (
            <div
              className='addItemButton scaleYonHover'
              style={{ height: '27px' }}></div>
          )}
        </>
      )}
    </>
  );
}
