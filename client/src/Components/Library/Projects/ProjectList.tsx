import e from 'express';
import { userInfo } from 'os';
import React, {
  useEffect,
  useState,
  useCallback
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FocusedProjectActionCreators } from '../../../Redux';
import { State } from '../../../Redux/reducers';
import ProjectListItem from './ProjectListItem';

function ProjectList() {
  const dispatch = useDispatch();
  const { updateFocusedProject } = bindActionCreators(
    FocusedProjectActionCreators,
    dispatch
  );
  const focusedProjectState = useSelector(
    (state: State) => state.focusedProject
  );
  const [filterToLeadingOnly, setFilterToLeadingOnly] = useState(false);
  const sessionState = useSelector((state: State) => state.session);

  let projectsList: any = [];
  let currentUser = {
    username: sessionState.currentUser?.username,
    discriminator: sessionState.currentUser?.discriminator,
  };

  if (filterToLeadingOnly === true) {
    sessionState.currentTeam?.projects.forEach((project: any) => {
      let leaders: any = project.project_members.filter((member: any) => {
        if (member.role_id === 1 || member.role_id === 2) {
          return true;
        }
      });
      let index = leaders.findIndex((leader: any) => {
        if (
          leader.username === currentUser.username &&
          leader.discriminator === currentUser.discriminator
        ) {
          return true;
        }
      });
      //if the current user exists in the list of leader of each individual project, push that project onto the viewable project list for the current user
      if (index !== -1) {
        projectsList.push(project.name);
      }
    });
  } else {
    sessionState.currentTeam?.projects.forEach((project: any) =>
      projectsList.push(project.name)
    );
  }

  useEffect(() => {
    if (focusedProjectState.name === 'All') {
      document.getElementById('All')?.classList.add('selectedProjectInList');
      document.getElementById('All')?.classList.remove('scaleYonHover');
    } else {
      document.getElementById('All')?.classList.remove('selectedProjectInList');
      document.getElementById('All')?.classList.add('scaleYonHover');
    }
  }, [focusedProjectState]);

  function checkView() {
    if (filterToLeadingOnly === true) {
      return 'Projects You Lead';
    } else {
      return 'Your Projects';
    }
  }
  let WhichView = checkView();

  const [deltaX, setDeltaX] = useState<number>(0);
  let projectList = document.getElementById('projectList');
  let toggleWidth = document.getElementById('projectsFilterToggle') ? document.getElementById('projectsFilterToggle')!.offsetWidth : 0
  let scrollWidth = 0 
  if(projectList){
    scrollWidth = projectList!.scrollWidth 
  }
  useEffect(() => {
    if (projectList) {
        projectList!.scrollLeft = deltaX;
      }
  }, [deltaX])
  function handleSideScroll(e: React.WheelEvent<HTMLDivElement>) {
    let newX: number = 0

    if(deltaX + e.deltaY < 0){
      newX = 0
    } else if(deltaX + e.deltaY > scrollWidth){
      newX = scrollWidth - (toggleWidth + 30)
    }else {
      newX = deltaX + e.deltaY 
    }
    setDeltaX(newX);
  };

  if (!projectsList) {
    return <></>;
  } else if (projectsList.length === 0 && filterToLeadingOnly === false) {
    return (
      <h4
        style={{
          color: '#ffffff',
          marginTop: '5px',
          marginBottom: '5px',
          height: '20px',
        }}>
        Looks like you haven't been assigned to any projects yet
      </h4>
    );
  } else {
    //needs pagination
    return (
      <div
        onWheel={(e) => handleSideScroll(e)}
        id='projectList'
        className='sideScrollList componentGlow'>
        <div
          id='All'
          onClick={() => updateFocusedProject({ name: 'All' })}
          className='sideScrollListItem scaleYonHover fadeIn'>
          All
        </div>
        {projectsList!.map((project: any) => (
          <ProjectListItem key={project} name={project} />
        ))}
        <button
          id='projectsFilterToggle'
          className='filterProjectsToggle scaleYonHover'
          onClick={() => setFilterToLeadingOnly(!filterToLeadingOnly)}>
          {WhichView}
        </button>
      </div>
    );
  }
}

export default ProjectList;
