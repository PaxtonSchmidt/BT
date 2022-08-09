import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import ComposedStats, {
  Assignee,
  PriorityStats,
  Project,
  StatusStats,
} from '../../../../API/interfaces/statsTypes';
import alertDispatcher from '../../../../API/Requests/AlertDispatcher';
import { CustomResponse } from '../../../../API/Requests/Base/baseRequest';
import getProjectStats from '../../../../API/Requests/Projects/GetProjectStats';
import { AlertActionCreators } from '../../../../Redux';
import { fireAlert, hideAlert } from '../../../../Redux/action-creators/alertActionCreator';
import { State } from '../../../../Redux/reducers';
import { BreakPoints } from '../../../Library/Breakpoints';
import ProjectList from '../../../Library/Projects/ProjectList';
import ProjectChat from './ProjectChat';
import { ProjectChatModal } from './ProjectChatModal';
import ProjectFormContainer from './ProjectFormContainer';
import ProjectMembersManage from './ProjectMembersManage';

interface Props {
  isTeamSelected: boolean;
}
interface ChosenChartType {
  status: string;
  priority: string;
  assignee: string;
}
let ChartTypes: ChosenChartType = {
  status: 'Status',
  priority: 'Priority',
  assignee: 'Assignee',
};

export default function ProjectsPage({ isTeamSelected }: Props) {
  const dispatch = useDispatch()
  const {fireAlert, hideAlert} = bindActionCreators(AlertActionCreators, dispatch)
  const loginState = useSelector((state: State) => state.login);
  const sessionState = useSelector((state: State) => state.session);
  const [isExtended, setIsExtended] = useState<boolean>(false);
  const focusedProjectState = useSelector((state: State) => state.focusedProject);
  const [chartData, setChartData] = useState<any>();
  let [projectStats, setProjectStats] = useState<ComposedStats>();
  const [chartType, setChartType] = useState(ChartTypes.status);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const windowWidth = useSelector((state: State) => state.windowSize) | window.innerWidth //just so it has the inner width for the first render before it loads the redux state
  const [isProjectChatOpen, setIsProjectChatOpen] = useState<boolean>(false);

  let isATeamLead = false;
  if (!isATeamLead) {
  }

  if (sessionState.currentTeam !== undefined) {
    isATeamLead =
      sessionState.currentTeam.team_role === 1 ||
      sessionState.currentTeam.team_role === 2;
  }
  useEffect(() => {
    async function getProjectsStatistics() {
      let response: CustomResponse = await getProjectStats()
      response.isOk 
      ? setProjectStats(await response.body)
      : alertDispatcher(fireAlert, response.error, hideAlert)
    }
    getProjectsStatistics();
  }, []);
  function selectDataForChart() {
    let chosenProjectData: Assignee[] | PriorityStats | StatusStats | null =
      null;
    if (focusedProjectState.name === 'All') {
      if (chartType === ChartTypes.assignee) {
        return setChartType(ChartTypes.status);
      }
      if (chartType === ChartTypes.priority) {
        chosenProjectData = projectStats!.allProjectsStats.ticketPriorityStats;
      } else if (chartType === ChartTypes.status) {
        chosenProjectData = projectStats!.allProjectsStats.ticketStatusStats;
      }
      setChartData(chosenProjectData);
      return setIsLoading(false);
    }
    let projectIDX = projectStats?.projects.findIndex((project: Project) => {
      if (project.project_name === focusedProjectState.name) {
        return true;
      }
    });
    if (projectIDX === -1) {
      setChartData([]);
      return setIsLoading(false);
    }
    if (chartType === ChartTypes.assignee) {
      chosenProjectData =
        projectStats!.projects[projectIDX!].projectStats.ticketAssigneeStats;
    } else if (chartType === ChartTypes.priority) {
      chosenProjectData =
        projectStats!.projects[projectIDX!].projectStats.ticketPriorityStats;
    } else if (chartType === ChartTypes.status) {
      chosenProjectData =
        projectStats!.projects[projectIDX!].projectStats.ticketStatusStats;
    }
    setChartData(chosenProjectData);
    return setIsLoading(false);
  }
  useEffect(() => {
    if (projectStats) {
      selectDataForChart();
    }
  }, [focusedProjectState, chartType, projectStats]);

  if (chartType === ChartTypes.assignee) {
    document
      .getElementById('assignee')
      ?.classList.add('selectedChartTypeButton');
    document.getElementById('assignee')?.classList.remove('scaleYonHover');
  } else {
    document
      .getElementById('assignee')
      ?.classList.remove('selectedChartTypeButton');
    document.getElementById('assignee')?.classList.add('scaleYonHover');
  }
  if (chartType === ChartTypes.priority) {
    document
      .getElementById('priority')
      ?.classList.add('selectedChartTypeButton');
    document.getElementById('priority')?.classList.remove('scaleYonHover');
  } else {
    document
      .getElementById('priority')
      ?.classList.remove('selectedChartTypeButton');
    document.getElementById('priority')?.classList.add('scaleYonHover');
  }
  if (chartType === ChartTypes.status) {
    document.getElementById('status')?.classList.add('selectedChartTypeButton');
    document.getElementById('status')?.classList.remove('scaleYonHover');
  } else {
    document
      .getElementById('status')
      ?.classList.remove('selectedChartTypeButton');
    document.getElementById('status')?.classList.add('scaleYonHover');
  }

  //if not logged in go to login, if team isnt selected go to select team
  if (loginState === 1) {
    if (isTeamSelected === true) {
      if (sessionState.currentTeam === undefined) {
        return <></>;
      }
      return (
        <div className='overflow' style={windowWidth > BreakPoints.tablet ? {} : {paddingLeft: '5px'}}>
          {isATeamLead && (
            <div
              id='pageContentContainer'
              className={`pageContentContainer projectPageContent ${
                isExtended ? 'FormContainerTransition' : ''
              }`}
            >
              <ProjectFormContainer
                isExtended={isExtended}
                setIsExtended={setIsExtended}
              />
            </div>
          )}

          <div
            className={`pageBodyContainer4  fadeIn ${
              isATeamLead ? '' : 'notATeamLeadMargin'
            }`}
            style={{ flexDirection: 'row' }}
          >
            <ProjectList />
            <div className={`pageBodyContainer5 ${windowWidth > BreakPoints.mobile ? '' : 'pageBodyContainer5SM'}`} >
              <div className='pageBodyQuadrant' style={{borderRight: 'none'}}>
                <ProjectMembersManage setIsProjectChatOpen={setIsProjectChatOpen}/>
              </div>

              <div className={`pageBodyQuadrant fadeIn ${windowWidth > BreakPoints.mobile ? '' : 'pageBodyQuadrantSM'}`} style={{borderRight: 'none'}}>
                {windowWidth > BreakPoints.mobile 
                ? <ProjectChat vWidth={windowWidth} />
                : <ProjectChatModal projectName={focusedProjectState.name} vWidth={windowWidth} isOpen={isProjectChatOpen} setIsOpen={setIsProjectChatOpen} />}
              </div>
            </div>
            
          </div>
        </div>
      );
    }
    return <Navigate to='/selectTeam' />;
  }
  return <Navigate to='/login' />;
}

