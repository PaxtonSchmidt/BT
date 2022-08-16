import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Teammate } from '../../../API/interfaces/teammate';
import { FocusedTeammateActionCreators } from '../../../Redux';
import { State } from '../../../Redux/reducers';
import TeammateListItem from './TeammateListItem';
let deepClone = require('lodash.clonedeep');

export default function TeammateList() {
  const dispatch = useDispatch();
  const { updateFocusedTeammate } = bindActionCreators(
    FocusedTeammateActionCreators,
    dispatch
  );
  const sessionState = useSelector((state: State) => state.session);
  const teammatesState = useSelector((state: State) => state.teammates);
  const focusedTeammate = useSelector((state: State) => state.focusedTeammate);
  let teammates: Teammate[] = [];

  if (teammatesState[0] !== undefined) {
    teammates = teammatesState;
  }

  function handleTeammateSelect(focusedTeammateIDX: number) {
    updateFocusedTeammate(teammates![focusedTeammateIDX]);
  }

  if (teammates.length === 0) {
    return (
      <>
        <div
          className='listRow fadeIn'
          style={{ marginTop: '0px', backgroundColor: '#222222' }}
        ></div>
        <div
          id='list'
          className='membersList componentGlow fadeIn'
        ></div>
      </>
    );
  } else {
    return (
      <>
        <div
          className='listRow fadeIn'
          style={{ marginTop: '0px', backgroundColor: '#222222', justifyContent: 'center' , padding: '0px', paddingLeft: '0px !important', paddingRight: '0px !important'}}
        >
          <div
            className='memberListRowSection fadeIn'
            style={{ textAlign: 'center', width: '110px' }}
          >
            <span className='rowItem' >
              Team Roles
            </span>
          </div>
        </div>
        <div id='list' className='membersList componentGlow fadeIn' style={{transition: '0s', height: '320px'}}>
          {teammates!.map((teammate: any, index: any) => (
            //docs say its not ideal to use the index for the key
            //however here it is necessary
            <TeammateListItem
              key={index}
              teammate={teammate}
              IDX={index}
              handleTeammateSelect={handleTeammateSelect}
              focusedTeammateUsername={focusedTeammate.username}
              focusedTeammateDiscriminator={focusedTeammate.discriminator}
            />
          ))}
        </div>
      </>
    );
  }
}
