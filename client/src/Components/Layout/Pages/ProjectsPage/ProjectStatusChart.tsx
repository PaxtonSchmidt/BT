import React, { useEffect, useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { DataEntry } from 'react-minimal-pie-chart/types/commonTypes';
import { StatusStats } from '../../../../API/interfaces/statsTypes';

interface Props {
  data: StatusStats;
  isLoading: boolean;
}

export default function ProjectStatusChart(props: Props) {
  const [dataArray, setDataArray] = useState<DataEntry[]>([]);
  function setNewDataArray() {
    let closedVal: number = 0;
    let assignedVal: number = 0;
    let InvestigatingVal: number = 0;
    let reviewingVal: number = 0;
    let unassignedVal: number = 0;
    if (props.data.Closed !== undefined) {
      closedVal = props.data.Closed;
    }
    if (props.data.Assigned !== undefined) {
      assignedVal = props.data.Assigned;
    }
    if (props.data.Investigating !== undefined) {
      InvestigatingVal = props.data.Investigating;
    }
    if (props.data.Reviewing !== undefined) {
      reviewingVal = props.data.Reviewing;
    }
    if (props.data.Unassigned !== undefined) {
      unassignedVal = props.data.Unassigned;
    }
    let newDataArray: DataEntry[] = [
      { title: 'Assigned', color: '#222222', value: assignedVal },
      { title: 'Unassigned', color: '#222222', value: unassignedVal },
      { title: 'Investigating', color: '#222222', value: InvestigatingVal },
      { title: 'Reviewing', color: '#222222', value: reviewingVal },
      { title: 'Closed', color: '#222222', value: closedVal },
    ];
    if (
      closedVal === 0 &&
      assignedVal === 0 &&
      reviewingVal === 0 &&
      InvestigatingVal === 0 &&
      reviewingVal === 0 &&
      unassignedVal === 0
    ) {
      return setDataArray([]);
    }
    let indicesToRemove: number[] = [];
    newDataArray.forEach((data: DataEntry, index) => {
      if (data.value === 0) {
        indicesToRemove.push(index);
      }
    });
    for (let i = indicesToRemove.length - 1; i >= 0; i--) {
      newDataArray.splice(indicesToRemove[i], 1);
    }
    return setDataArray(newDataArray);
  }
  useEffect(() => {
    if (props.data !== undefined) {
      setNewDataArray();
    }
  }, [props]);

  if (dataArray.length === 0) {
    return (
      <div className='noDataChartWarning fadeIn'>
        <p>This project doesn't have any tickets yet</p>
      </div>
    );
  } else {
    return (
      <PieChart
        data={dataArray}
        label={({ x, y, dx, dy, dataEntry }) => (
          <text dominantBaseline='central' x={x} y={y} dx={dx} dy={dy}>
            <tspan className='chartValue'>{`${dataEntry.value}`}</tspan>
            <tspan className='username chartLabel'>
              {` ${dataEntry.title}`}
            </tspan>
          </text>
        )}
        segmentsShift={1}
        className='pieChart fadeIn'
      />
    );
  }
}
