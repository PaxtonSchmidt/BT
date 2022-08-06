import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import ComposedStats, {
  Assignee,
  PriorityStats,
  Project,
  StatusStats,
} from '../../../../API/interfaces/statsTypes';
import { State } from '../../../../Redux/reducers';
import ProjectList from '../../../Library/Projects/ProjectList';
import ProjectChat from './ProjectChat';
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
  const loginState = useSelector((state: State) => state.login);
  const sessionState = useSelector((state: State) => state.session);
  const [isExtended, setIsExtended] = useState<boolean>(false);
  const focusedProjectState = useSelector(
    (state: State) => state.focusedProject
  );
  const [chartData, setChartData] = useState<any>();
  let [projectStats, setProjectStats] = useState<ComposedStats>();
  const [chartType, setChartType] = useState(ChartTypes.status);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
      let response: any = fetch('/projects/getProjectsStatistics', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json());
      setProjectStats(await response);
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
        <div className='overflow'>
          {isATeamLead && (
            <div
              id='pageContentContainer'
              className={`pageContentContainer  projectPageContent ${
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
            <div className='pageBodyContainer5'>
              <div className='pageBodyQuadrant' style={{borderRight: 'none'}}>
                <ProjectMembersManage />
              </div>
              <div className='pageBodyQuadrant fadeIn' style={{borderRight: 'none'}}>
                <ProjectChat />
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

