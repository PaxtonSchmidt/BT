import React, { useEffect, useState } from 'react'
import { PieChart } from 'react-minimal-pie-chart'
import { DataEntry } from 'react-minimal-pie-chart/types/commonTypes';
import { StatusStats } from '../../../../API/interfaces/statsTypes';

interface Props {
    data: StatusStats,
    isLoading: boolean
}

export default function ProjectStatusChart(props: Props){
    const [dataArray, setDataArray] = useState<DataEntry[]>([]);
    function setNewDataArray(){    
        let closedVal: number = 0;
        let openVal: number = 0;
        let spVal: number = 0;
        let srVal: number = 0;
        let unassignedVal: number = 0;
        if(props.data.Closed !== undefined){closedVal = props.data.Closed}
        if(props.data.Open !== undefined){openVal = props.data.Open}
        if(props.data.SolutionProposed !== undefined){spVal = props.data.SolutionProposed}
        if(props.data.SolutionRejected !== undefined){srVal = props.data.SolutionRejected}
        if(props.data.Unassigned !== undefined){unassignedVal = props.data.Unassigned}
        let newDataArray: DataEntry[] = [
            {title: 'Closed', color: '#222222', value: closedVal},
            {title: 'Open', color: '#222222', value: openVal},
            {title: 'Solution Proposed', color: '#222222', value: spVal},
            {title: 'Solution Rejected', color: '#222222', value: srVal},
            {title: 'Unassigned', color: '#222222', value: unassignedVal}
        ]
        if(closedVal === 0 && openVal === 0 && spVal === 0 && srVal === 0 && unassignedVal === 0){
            return setDataArray([])
        }
        let indicesToRemove: number[] = []
        newDataArray.forEach((data: DataEntry, index)=>{
            if(data.value === 0){
                indicesToRemove.push(index)
            }
        })
        for(let i = indicesToRemove.length -1; i >= 0; i--){
            newDataArray.splice(indicesToRemove[i], 1)
        }
        return setDataArray(newDataArray)
    }
    useEffect(() => {if(props.data !== undefined){setNewDataArray()}}, [props])

    if(dataArray.length === 0){
        return (
            <div className='noDataChartWarning fadeIn'>
                <p>This project doesn't have any tickets yet</p>
            </div>
        )
    } else {
        return (
            <PieChart
            data={dataArray}
            label={({x, y, dx, dy, dataEntry})=>
                <text dominantBaseline='central' x={x} y={y} dx={dx} dy={dy} >
                    <tspan className='chartValue'>{`${dataEntry.value}`}</tspan>
                    <tspan className='username chartLabel'>
                        {` ${dataEntry.title}`}
                    </tspan>
                </text>
            }
            segmentsShift={.3}
            className='pieChart fadeIn'
            />
        )
    }
}