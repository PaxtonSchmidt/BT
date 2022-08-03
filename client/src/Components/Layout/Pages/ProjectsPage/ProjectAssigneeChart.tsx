import React, { useEffect, useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { DataEntry } from 'react-minimal-pie-chart/types/commonTypes';
import { Assignee } from '../../../../API/interfaces/statsTypes';
import { AssigneeStatistic } from '../../../ComponentInterfaces/statistic';

interface Props {
  data: Assignee[] | undefined;
}

export default function ProjectAssigneeChart(props: Props) {
  const [dataArray, setDataArray] = useState<DataEntry[]>([]);

  function setNewDataArray() {
    let newDataArray: DataEntry[] = [];
    if (props.data![0] === undefined) {
      return setDataArray([]);
    }
    props.data?.forEach((stat: AssigneeStatistic) => {
      let itemTitle = '';
      let discriminator = '';
      if (stat.username === null) {
        itemTitle = 'Unassigned';
      } else {
        itemTitle = stat.username;
      }
      if (stat.discriminator !== null) {
        discriminator = `#${stat.discriminator}`;
      }
      let dataItem: DataEntry = {
        title: itemTitle,
        color: '#222222',
        value: stat.amount,
        discriminator: discriminator,
      };
      newDataArray.push(dataItem);
    });
    let indicesOfZeroAmount: number[] = [];
    newDataArray.forEach((data: DataEntry, index) => {
      if (data.value === 0) {
        indicesOfZeroAmount.push(index);
      }
    });
    if (indicesOfZeroAmount.length === newDataArray.length) {
      return setDataArray([]);
    }
    return setDataArray(newDataArray);
  }
  useEffect(() => {
    if (props.data !== null) {
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
            <tspan
              className='discriminator chartLabel'
              dy={0.5}
              style={{ fontSize: '3px', paddingTop: '2px' }}
            >
              {dataEntry.discriminator}
            </tspan>
          </text>
        )}
        segmentsShift={1}
        className='pieChart fadeIn'
      />
    );
  }
}
