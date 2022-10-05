import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import styled from '@emotion/styled';
import './PitchCalendar.css';
import CalHeader from './CalHeader';
import { CalSessionPill } from './CalSessionPill';
import { CalTimeGutter } from './CalTimeGutter';
import { CreateEvent } from '../modal/CreateEvent';
import moment from 'moment';
import {
  StyledAddIcon,
  StyledButton,
  StyledIconButton,
} from '../pitch/style/PitchSessionStyle';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import useOpeningHours from '../../hooks/useOpeningHours';

const StyledFullCalendar = styled.div`
  margin: 0 16px;
  height: calc(100vh - 72px) !important;
  position: relative;
`;

export const PitchCalendar = ({ pitchId }) => {
  const [createEV, setCreateEV] = useState(false);
  const [eventStartTime, setEventStartTime] = useState(null);
  const [eventEndTime, setEventEndTime] = useState(null);
  const backEndUrl =
    process.env.REACT_APP_backEndUrl || 'http://localhost:8080';
  const url = `${backEndUrl}/pitch/${pitchId}/events`;

  let { hours, isLoading, isError } = useOpeningHours(pitchId);

  const history = useHistory();

  const handleClose = () => setCreateEV(false);

  const handleOpen = () => {
    // redirect if not loggedin
    if (!Cookies.get('id')) {
      history.push('/signin');
    } else {
      setCreateEV(true);
    }
  };

  if (isLoading || isError) {
    hours = {};
  }

  return (
    <StyledFullCalendar>
      <StyledButton>
        <StyledIconButton
          color="primary"
          aria-label="Create Session"
          component="span"
          onClick={handleOpen}
        >
          <StyledAddIcon color="blue" fontSize="large" />
        </StyledIconButton>
      </StyledButton>
      <FullCalendar
        plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        height="calc(100vh - 72px)"
        navLinks={true}
        nowIndicator={true}
        selectable={true}
        businessHours={hours}
        events={{
          url: url,
          backgroundColor: '#cefffd',
          textColor: 'black',
          editable: true,
        }}
        headerToolbar={{
          left: 'dayGridMonth,timeGridWeek,timeGridDay',
          center: 'title',
          right: 'today,prev,next',
        }}
        dayHeaderContent={(args) => {
          return (
            <CalHeader
              currentDate={args.date}
              show={args.view.type !== 'dayGridMonth'}
            />
          );
        }}
        select={(info) => {
          setEventStartTime(moment(info.start.toISOString()));
          setEventEndTime(moment(info.end.toISOString()));
          setCreateEV(true);
        }}
        // viewDidMount={(args) => {
        //   setCreateEV(false);
        // }}
        slotLabelContent={(args) => {
          return <CalTimeGutter time={args.text} />;
        }}
        eventContent={(args) => {
          if (args.view.type === 'dayGridMonth') {
            return;
          }
          const data = args.event._def;
          return (
            <CalSessionPill
              name={data.title}
              sessionId={data.extendedProps.sessionId}
              number={data.extendedProps.players}
              rawData={data.extendedProps}
              isPast={args.isPast}
            />
          );
        }}
      />
      {createEV && (
        <CreateEvent
          pitchId={pitchId}
          handleClose={handleClose}
          open={createEV}
          eventStartTime={eventStartTime}
          eventEndTime={eventEndTime}
        />
      )}
    </StyledFullCalendar>
  );
};
