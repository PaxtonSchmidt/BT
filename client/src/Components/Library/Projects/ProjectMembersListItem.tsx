import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FocusedMemberActionCreators } from '../../../Redux';
import { State } from '../../../Redux/reducers';
import { translateRole } from '../../../Services/translateRole';

interface Props {
  member: any;
}

export default function ProjectMembersListItem(props: Props) {
  const dispatch = useDispatch();
  const { updateFocusedMember } = bindActionCreators(
    FocusedMemberActionCreators,
    dispatch
  );
  const focusedProjectState = useSelector(
    (state: State) => state.focusedProject
  );
  let role = translateRole.TranslateProjectRole(props.member.role_id);
  function handleSelect() {
    if (focusedProjectState.name !== 'All') {
      return updateFocusedMember(props.member);
    }
  }
  let noFocusedMemberClasses = focusedProjectState.name === 'All' ? '' : 'scaleYonHover hoverGrey'
  return (
    <div
      className={`ListContainer ${noFocusedMemberClasses}`}
      onClick={handleSelect}
      style={{ marginLeft: '0px' }}>
      <div
        className={`listItem listRow memberRow ${
          focusedProjectState.name === 'All' && 'defaultCursor'
        }`}
        style={{
          justifyContent: 'space-between',
          overflowX: 'hidden',
          marginLeft: '0px',
        }}>
        <div
          className='memberListRowSection'
          style={{
            display: 'flex',
            textAlign: 'center',
            alignContent: 'bottom',
          }}>
          <span
            className='rowItem username'
            style={{
              marginLeft: '5px',
              display: 'inline-block',
              width: 'fit-content',
              maxWidth: '160px',
              overflowX: 'hidden',
              textOverflow: 'ellipsis',
            }}>
            {props.member.username}
          </span>
          <span
            className='rowItem discriminator'
            style={{
              display: 'inline-block',
              width: 'fit-content',
              marginTop: 'auto',
            }}>
            #{props.member.discriminator}
          </span>
        </div>

        <div
          className='memberListRowSection'
          style={{ textAlign: 'center', width: '100px' }}>
          <span className='rowItem'>
            {focusedProjectState.name === 'All' ? <></> : <>{role}</>}
          </span>
        </div>
      </div>
    </div>
  );
}
