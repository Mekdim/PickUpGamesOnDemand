import React from "react";
import styled from "@emotion/styled";
import Divider from "@mui/material/Divider";
import TimeGutter from "./TimeGutter";
import Day from "./Day";
import CurrentTimeIndicator from "./CurrentTimeIndicator";

const StyledWeek = styled.div`
  display: flex;
  flex-direction: row;
  overflow: hidden;
  position: relative;
`;

const Calendar = ({ height, events, calendarDays = 2 }) => {
  const todayEvents = events[0] || [];
  const tomorrowEvents = events[1] || [];
  const thirdDayEvents = events[2] || [];
  const fourthDayEvents = events[3] || [];

  return (
    <StyledWeek>
      <CurrentTimeIndicator id={"current-time"} height={height} />
      <TimeGutter />
      <Divider color={"#949492"} orientation={"vertical"} flexItem />
      <Day events={todayEvents} />
      {calendarDays >= 2 && (
        <>
          <Divider orientation={"vertical"} flexItem />
          <Day events={tomorrowEvents} />
        </>
      )}
      {calendarDays >= 3 && (
        <>
          <Divider orientation={"vertical"} flexItem />
          <Day events={thirdDayEvents} />
        </>
      )}
      {calendarDays >= 4 && (
        <>
          <Divider orientation={"vertical"} flexItem />
          <Day events={fourthDayEvents} />
        </>
      )}
    </StyledWeek>
  );
};

export default Calendar;
