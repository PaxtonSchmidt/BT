import React, { useEffect, useState } from 'react'
import { PieChart } from 'react-minimal-pie-chart'
import { DataEntry } from 'react-minimal-pie-chart/types/commonTypes';
import { PriorityStats, StatusStats } from '../../../../API/interfaces/statsTypes';

interface Props {
    data: PriorityStats
}

export default function ProjectPriorityChart(props: Props){
    const [dataArray, setDataArray] = useState<DataEntry[]>([]);
    
    function setNewDataArray(){    
        let chartColor = '#222222'
        let highVal: number = 0;
        let medVal: number = 0;
        let lowVal: number = 0;
        if(props.data.High !== undefined){highVal = props.data.High}
        if(props.data.Medium !== undefined){medVal = props.data.Medium}
        if(props.data.Low !== undefined){lowVal = props.data.Low}
        let newDataArray: DataEntry[] = [
            {title: 'High', color: chartColor, value: highVal},
            {title: 'Medium', color: chartColor, value: medVal},
            {title: 'Low', color: chartColor, value: lowVal}]
        if(highVal === 0 && medVal === 0 && lowVal === 0){
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
    useEffect(() => {if(props.data !== null){setNewDataArray()}}, [props])

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