import React from "react";
import styled from "@emotion/styled";

const StyledVerticalEvent = styled.div`
  margin: auto 1rem;
`;

const StyledEvent = styled.div`
  width: 100%;
  display: grid;
`;

const StyledMainEvent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: available;
  min-height: 25px;
  position: relative;
`;

const EventBox = ({ children }) => {
  return (
    <StyledMainEvent>
      <StyledEvent>
        <StyledVerticalEvent> {children} </StyledVerticalEvent>
      </StyledEvent>
    </StyledMainEvent>
  );
};

export default EventBox;
