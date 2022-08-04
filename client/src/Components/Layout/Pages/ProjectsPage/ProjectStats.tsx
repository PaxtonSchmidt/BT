import React from 'react'

const ProjectStats: React.FC = () => {
    return (
        <>asd</>
    // <div
    //     className='pageBodyQuadrant fadeIn'
    //     style={{
    //         borderRight: 'none',
    //         flexDirection: 'column',
    //         paddingLeft: '10px',
    //     }}
    //     >
    //     <div className='selectChartButtons'>
    //         <div style={{ color: 'white' }}>
    //         <p>{`Data:`}</p>
    //         </div>
    //         <div
    //         id='status'
    //         className='inComponentButton chartTypeButton scaleYonHover'
    //         onClick={() => setChartType(ChartTypes.status)}
    //         style={{ marginLeft: 'auto' }}
    //         >
    //         <p style={{ margin: '0px' }}>Status</p>
    //         </div>
    //         <div
    //         id='priority'
    //         className='inComponentButton chartTypeButton scaleYonHover'
    //         onClick={() => setChartType(ChartTypes.priority)}
    //         style={{ marginLeft: '3px' }}
    //         >
    //         <p style={{ margin: '0px' }}>Priority</p>
    //         </div>
    //         {focusedProjectState.name !== 'All' && (
    //         <div
    //             className='inComponentButton chartTypeButton scaleYonHover'
    //             id='assignee'
    //             onClick={() => setChartType(ChartTypes.assignee)}
    //             style={{ marginLeft: '3px' }}
    //         >
    //             <p style={{ margin: '0px' }}>Assignee</p>
    //         </div>
    //         )}
    //     </div>
    //     {isLoading ? (
    //         <></>
    //     ) : (
    //         <>
    //         {chartType === ChartTypes.status && (
    //             <ProjectStatusChart
    //             data={chartData}
    //             isLoading={isLoading}
    //             />
    //         )}
    //         {chartType === ChartTypes.assignee && (
    //             <ProjectAssigneeChart data={chartData} />
    //         )}
    //         {chartType === ChartTypes.priority && (
    //             <ProjectPriorityChart data={chartData} />
    //         )}
    //         </>
    //     )}
    //     </div>
    )
}

export default ProjectStats