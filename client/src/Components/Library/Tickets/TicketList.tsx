import TextField from '@mui/material/TextField';
import e from 'express';
import { Formik, useFormik } from 'formik';
import React, { useState, useEffect, useRef } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FocusedTicketActionCreators } from '../../../Redux';
import { State } from '../../../Redux/reducers';
import { sorts, sortAction, SortTypes } from '../../ComponentInterfaces/sorts';
import { ticket } from '../../ComponentInterfaces/ticket';
import SortArrow from '../Buttons/sortArrow';
import TicketListItem from './TicketListItem';
import searchIcon from '../../Images/Icons/search.svg';
import { InputAdornment } from '@mui/material';

function Tickets() {
  let dispatch = useDispatch();
  const { updateFocusedTicket } = bindActionCreators(
    FocusedTicketActionCreators,
    dispatch
  );
  const focusedTicketState = useSelector((state: State) => state.focusedTicket);
  const ticketsState = useSelector((state: State) => state.tickets);
  const [tickets, setTickets] = useState<any[]>([]);
  const [isClosedFiltered, setIsClosedFiltered] = useState<boolean>(true);
  const [isSortReversed, setIsSortReversed] = useState<boolean>(false);
  let initialSortType = window.localStorage.getItem('srtTyp') || sorts.title;
  const [sortedBy, setSortedBy] = useState<string>(initialSortType);

  useEffect(() => {
    setTickets([...ticketsState]);
  }, [ticketsState]);

  function filterClosed() {
    let newTickets: ticket[] = [...tickets];
    //filter out closed tickets depending on toggle
    if (isClosedFiltered) {
      newTickets = newTickets.filter(
        (ticket: ticket) => ticket.resolution_status !== 5
      );
    }
    setTickets(newTickets);
  }

  function sortBy(
    sort: string,
    checkReversal: boolean = true,
    passedInTickets: ticket[] = []
  ) {
    window.localStorage.setItem('srtTyp', sort);
    //optionally pass in a ticket array instead of using the tickets in component state
    let newTickets: ticket[];
    passedInTickets.length > 0
      ? (newTickets = [...passedInTickets])
      : (newTickets = [...tickets]);

    //cannot rely on these sort functions to persist an array reversal
    switch (sort) {
      case sorts.project:
        newTickets = sortAction.sortByProject(newTickets);
        break;
      case sorts.status:
        newTickets = sortAction.sortByStatus(newTickets);
        break;
      case sorts.priority:
        newTickets = sortAction.sortByPriority(newTickets);
        break;
      case sorts.title:
        newTickets = sortAction.sortByTitle(newTickets);
        break;
      default:
        break;
    }

    if (checkReversal === true) {
      if (sortedBy === sort && !isSortReversed) {
        newTickets.reverse();
        setIsSortReversed(!isSortReversed);
      } else {
        setIsSortReversed(false);
      }
    }
    setTickets(newTickets);
    setSortedBy(sort);
  }

  function handleSearch(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    let searchInput = e.currentTarget.value.toLowerCase();
    let loopLength = searchInput.length;
    if (loopLength > 0) {
      let newTickets: ticket[] = [];
      for (let i = ticketsState.length - 1; i > 0; i--) {
        let currentTicketTitle = ticketsState[i].title
          .substring(0, loopLength)
          .toLowerCase();
        if (currentTicketTitle === searchInput) {
          newTickets.push(ticketsState[i]);
        }
      }
      setTickets(newTickets);
      sortBy(sortedBy, false, newTickets);
    } else {
      console.log('BBB');
      setTickets(ticketsState);
      sortBy(sortedBy, false, ticketsState);
    }
  }

  //needs pagination
  return (
    <Container className='pageBodyContainer1 fadeIn'>
      <div className='listContainer'>
        <div
          className='listRow'
          style={{
            marginTop: '5px',
            borderBottom: 'none',
            height: '30px',
            justifyContent: 'space-between',
          }}
        >
          <p
            className='delayedFadeIn'
            style={{
              fontSize: '12px',
              color: '#ffffff31',
              marginBottom: '5px',
              marginTop: 'auto',
            }}
          >{`Showing ${tickets.length} entries`}</p>
          <Formik
            initialValues={{ search: '' }}
            onSubmit={() => {}}
            style={{ width: '600px' }}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset,
            }) => {
              return (
                <form
                  className='searchTicketsForm fadeIn'
                  onSubmit={handleSubmit}
                  onBlur={handleBlur}
                >
                  <TextField
                    type='text'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <img
                            style={{ paddingLeft: '10px' }}
                            src={searchIcon}
                          />
                        </InputAdornment>
                      ),
                    }}
                    value={values.search}
                    onChange={(e) => {
                      handleChange(e);
                      handleSearch(e);
                    }}
                    onBlur={handleBlur}
                    sx={{ width: '100%' }}
                    name='search'
                    variant='standard'
                    color='info'
                  />
                </form>
              );
            }}
          </Formik>
        </div>
        <div className='listRow' style={{ marginTop: '0px', height: '35px' }}>
          <div className='listRowSection leftSection'>
            <span
              className='rowItem scaleYonHover'
              style={{ cursor: 'pointer', paddingLeft: '0px' }}
              onClick={() => sortBy(sorts.title)}
            >
              Title
              {sortedBy === sorts.title && (
                <SortArrow isSortReversed={isSortReversed} />
              )}
            </span>
          </div>
          <div className='listRowSection rightSection'>
            <span
              className='rowItem scaleYonHover'
              style={{ cursor: 'pointer' }}
              onClick={() => sortBy(sorts.project)}
            >
              Project
              {sortedBy === sorts.project && (
                <SortArrow isSortReversed={isSortReversed} />
              )}
            </span>
            <span
              className='rowItem scaleYonHover'
              style={{ cursor: 'pointer' }}
              onClick={() => sortBy(sorts.status)}
            >
              Status
              {sortedBy === sorts.status && (
                <SortArrow isSortReversed={isSortReversed} />
              )}
            </span>
            <span
              className='rowItem scaleYonHover'
              style={{ cursor: 'pointer' }}
              onClick={() => sortBy(sorts.priority)}
            >
              Priority
              {sortedBy === sorts.priority && (
                <SortArrow isSortReversed={isSortReversed} />
              )}
            </span>
          </div>
        </div>

        {tickets.length === 0 ? (
          <div
            className='list componentGlow delayedFadeIn'
            style={{ textAlign: 'center', color: 'white' }}
          >
            <p style={{ paddingTop: '10px' }}>No tickets</p>
          </div>
        ) : (
          <div className='list componentGlow' style={{ textAlign: 'left' }}>
            {tickets?.map((ticket: ticket) => (
              <TicketListItem
                key={ticket.ticket_id}
                title={ticket.title}
                ticket_id={ticket.ticket_id}
                description={ticket.description}
                author_username={ticket.author_username}
                author_discriminator={ticket.author_discriminator}
                assignee_username={ticket.assignee_username}
                assignee_user_discriminator={ticket.assignee_user_discriminator}
                project_id={ticket.project_id}
                project_name={ticket.project_name}
                date_created={ticket.date_created}
                date_last_updated={ticket.date_last_updated}
                resolution_status={ticket.resolution_status}
                priority={ticket.priority}
                setFocusedTicket={updateFocusedTicket}
                focusedTicketID={focusedTicketState.ticket_id}
              />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}

export default Tickets;
