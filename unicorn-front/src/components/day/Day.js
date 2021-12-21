import Divider from "@mui/material/Divider";
import EventBox from "./EventBox";
import React from "react";
import styled from "@emotion/styled";

const StyledDay = styled.div`
  width: 100%;
`;

const StyledDivider = styled(Divider)`
  margin-top: 6px;
  margin-bottom: 5px;
`;

const Day = ({ events }) => {
  return (
    <StyledDay>
      <StyledDivider />
      <EventBox time={"1 AM"} children={events ? events[0] : null} />
      <StyledDivider />
      <EventBox time={"2 AM"} children={events ? events[1] : null} />
      <StyledDivider />
      <EventBox time={"3 AM"} children={events ? events[2] : null} />
      <StyledDivider />
      <EventBox time={"4 AM"} children={events ? events[3] : null} />
      <StyledDivider />
      <EventBox time={"5 AM"} children={events ? events[4] : null} />
      <StyledDivider />
      <EventBox time={"6 AM"} children={events ? events[5] : null} />
      <StyledDivider />
      <EventBox time={"7 AM"} children={events ? events[6] : null} />
      <StyledDivider />
      <EventBox time={"8 AM"} children={events ? events[7] : null} />
      <StyledDivider />
      <EventBox time={"9 AM"} children={events ? events[8] : null} />
      <StyledDivider />
      <EventBox time={"10 AM"} children={events ? events[9] : null} />
      <StyledDivider />
      <EventBox time={"11 AM"} children={events ? events[10] : null} />
      <StyledDivider />
      <EventBox time={"12 AM"} children={events ? events[11] : null} />
      <StyledDivider />
      <EventBox time={"1 PM"} children={events ? events[12] : null} />
      <StyledDivider />
      <EventBox time={"2 PM"} children={events ? events[13] : null} />
      <StyledDivider />
      <EventBox time={"3 PM"} children={events ? events[14] : null} />
      <StyledDivider />
      <EventBox time={"4 PM"} children={events ? events[15] : null} />
      <StyledDivider />
      <EventBox time={"5 PM"} children={events ? events[16] : null} />
      <StyledDivider />
      <EventBox time={"6 PM"} children={events ? events[17] : null} />
      <StyledDivider />
      <EventBox time={"7 PM"} children={events ? events[18] : null} />
      <StyledDivider />
      <EventBox time={"8 PM"} children={events ? events[19] : null} />
      <StyledDivider />
      <EventBox time={"9 PM"} children={events ? events[20] : null} />
      <StyledDivider />
      <EventBox time={"10 PM"} children={events ? events[21] : null} />
      <StyledDivider />
      <EventBox time={"11 PM"} children={events ? events[22] : null} />
      <StyledDivider />
      <EventBox time={"12 PM"} children={events ? events[23] : null} />
      <StyledDivider />
    </StyledDay>
  );
};

export default Day;
