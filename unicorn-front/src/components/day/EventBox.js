import React from 'react';
import styled from '@emotion/styled';

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
  min-height: 36px;
  position: relative;
  background-color: ${(props) => {
    return props.enabled ? 'white' : '#f1f1f1';
  }};
  border-top: 1px solid #e0e0e0;
  width: 100%;
  border-bottom: ${(props) => {
    return props.last ? '1px solid #e0e0e0' : 0;
  }};
  cursor: ${(props) => {
    return props.enabled ? 'pointer' : 'not-allowed';
  }};
`;

const EventBox = ({ children, last = false, enabled = true }) => {
  return (
    <StyledMainEvent
      last={last}
      enabled={enabled}
      onClick={(e) => {
        if (!enabled) {
          e.stopPropagation();
        }
      }}
    >
      <StyledEvent>
        <StyledVerticalEvent> {children} </StyledVerticalEvent>
      </StyledEvent>
    </StyledMainEvent>
  );
};

export default EventBox;
