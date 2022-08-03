import React from 'react';
import { TicketNote } from '../../../API/interfaces/TicketNote';

interface Props {
  note: TicketNote;
}

export default function TicketNoteListItem(props: Props) {
  let isPm: boolean = false;
  let etcDifferenceToUTC: number = 4;
  let isSingleDigitMinutes: boolean = false;
  let date = parseInt(
    props.note.date_created.substring(5, 10).replace('-', '')
  );
  let hours = parseInt(
    props.note.date_created.toLocaleString().substring(11, 13)
  );
  let minutes = parseInt(
    props.note.date_created.toLocaleString().substring(14, 16)
  );
  // console.log(`${props.note.date_created} ${hours} ${minutes}`)
  // console.log(24 - (hours - etcDifferenceToUTC))
  if (hours < etcDifferenceToUTC) {
    hours = 24 + (hours - etcDifferenceToUTC);
    date = date - 1;
  } else {
    hours = hours - etcDifferenceToUTC;
  }
  if (hours > 12) {
    hours = hours % 12;
    isPm = true;
  }
  if (hours === 0) {
    hours = 12;
  }
  if (minutes < 10) {
    isSingleDigitMinutes = true;
  }

  let zero = '';
  if (isSingleDigitMinutes) {
    zero = '0';
  }
  let pm = '';
  if (isPm) {
    pm = 'pm';
  } else {
    pm = 'am';
  }

  let dateArray = date.toString().split('').reverse().join().replace(/,/g, '');
  let dateDay = dateArray.substring(0, 2);
  let dateMonth = dateArray
    .replace(dateDay, '')
    .split('')
    .reverse()
    .join()
    .replace(/,/g, '');

  dateDay = dateDay.split('').reverse().join().replace(/,/g, '');

  return (
    <div className='noteListItem'>
      <div style={{ display: 'flex', width: 'fit-content', height: '100%' }}>
        <p
          className='username'
          style={{ marginTop: '0px' }}
        >{`${props.note.author_username}\u00a0`}</p>
        {/* <p className='discriminator' style={{height: '11px', marginTop: '3px'}}>#{props.note.author_discriminator}</p> */}
      </div>
      <div
        style={{
          height: 'fit-content',
          marginLeft: '5px',
          wordBreak: 'break-word',
        }}
      >
        <p style={{ margin: '0px', height: 'fit-content' }}>
          {props.note.body}
          <span className='time'>{` ${hours}`}</span>
          <span className='time'>{`:${zero}${minutes}${pm}`}</span>
          <span className='time'>{`\u00a0${dateMonth}/${dateDay}`}</span>
        </p>
      </div>
    </div>
  );
}
