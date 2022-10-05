import React from 'react';
import styled from '@emotion/styled';
import Divider from '@mui/material/Divider';
import TimeGutter from './TimeGutter';
import Day from './Day';

const StyledWeek = styled.div`
  display: flex;
  flex-direction: row;
  overflow: hidden;
  position: relative;
`;

const Calendar = ({
  height,
  events,
  calendarDays = 2,
  click,
  hours,
  dates,
}) => {
  const todayEvents = events[0] || [];
  const tomorrowEvents = events[1] || [];
  const thirdDayEvents = events[2] || [];
  const fourthDayEvents = events[3] || [];
  const todayHours = hours[0] || [];
  const tomorrowHours = hours[1] || [];
  const thirdDayHours = hours[2] || [];
  const fourthDayHours = hours[3] || [];

  return (
    <StyledWeek>
      <TimeGutter />
      <Divider color={'#949492'} orientation={'vertical'} flexItem />
      <Day
        events={todayEvents}
        click={click}
        hours={todayHours}
        height={height}
        leadDate={dates[0]}
      />
      {calendarDays >= 2 && (
        <>
          <Divider orientation={'vertical'} flexItem />
          <Day
            events={tomorrowEvents}
            click={click}
            hours={tomorrowHours}
            height={height}
            leadDate={dates[1]}
          />
        </>
      )}
      {calendarDays >= 3 && (
        <>
          <Divider orientation={'vertical'} flexItem />
          <Day
            events={thirdDayEvents}
            click={click}
            hours={thirdDayHours}
            height={height}
            leadDate={dates[2]}
          />
        </>
      )}
      {calendarDays >= 4 && (
        <>
          <Divider orientation={'vertical'} flexItem />
          <Day
            events={fourthDayEvents}
            click={click}
            hours={fourthDayHours}
            height={height}
            leadDate={dates[3]}
          />
        </>
      )}
    </StyledWeek>
  );
};

export default Calendar;
