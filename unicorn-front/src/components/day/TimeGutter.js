import Divider from '@mui/material/Divider';
import React from 'react';
import styled from '@emotion/styled';

const StyledTime = styled.div`
  display: grid;
  width: 4.5rem;
  min-height: 25px;
`;

const StyledPara = styled.p`
  font-weight: 600;
  font-size: 11px;
  font-family: 'Ubuntu', sans-serif;
  color: #70757a;
  margin-block-start: 0em;
  margin-block-end: 0em;
`;

const StyledDivider = styled(Divider)`
  ::before {
    width: 0%;
  }

  .MuiDivider-wrapper {
    padding-left: 18.6px;
  }
  min-height: 12px;
  max-height: 12px;
`;

const TimeGutter = () => {
  return (
    <div>
      <StyledDivider textAlign="left">
        <StyledPara>0 AM</StyledPara>
      </StyledDivider>
      <StyledTime />
      <StyledDivider textAlign="left">
        <StyledPara>1 AM</StyledPara>
      </StyledDivider>
      <StyledTime />
      <StyledDivider textAlign="left">
        <StyledPara>2 AM</StyledPara>
      </StyledDivider>
      <StyledTime />
      <StyledDivider textAlign="left">
        <StyledPara>3 AM</StyledPara>
      </StyledDivider>
      <StyledTime />
      <StyledDivider textAlign="left">
        <StyledPara>4 AM</StyledPara>
      </StyledDivider>
      <StyledTime />
      <StyledDivider textAlign="left">
        <StyledPara>5 AM</StyledPara>
      </StyledDivider>
      <StyledTime />
      <StyledDivider textAlign="left">
        <StyledPara>6 AM</StyledPara>
      </StyledDivider>
      <StyledTime />
      <StyledDivider textAlign="left">
        <StyledPara>7 AM</StyledPara>
      </StyledDivider>
      <StyledTime />
      <StyledDivider textAlign="left">
        <StyledPara>8 AM</StyledPara>
      </StyledDivider>
      <StyledTime />
      <StyledDivider textAlign="left">
        <StyledPara>9 AM</StyledPara>
      </StyledDivider>
      <StyledTime />
      <StyledDivider textAlign="left">
        <StyledPara>10 AM</StyledPara>
      </StyledDivider>
      <StyledTime />
      <StyledDivider textAlign="left">
        <StyledPara>11 AM</StyledPara>
      </StyledDivider>
      <StyledTime />
      <StyledDivider id={'mid-day'} textAlign="left">
        <StyledPara>12 PM</StyledPara>
      </StyledDivider>
      <StyledTime />
      <StyledDivider textAlign="left">
        <StyledPara>1 PM</StyledPara>
      </StyledDivider>
      <StyledTime />
      <StyledDivider textAlign="left">
        <StyledPara>2 PM</StyledPara>
      </StyledDivider>
      <StyledTime />
      <StyledDivider textAlign="left">
        <StyledPara>3 PM</StyledPara>
      </StyledDivider>
      <StyledTime />
      <StyledDivider textAlign="left">
        <StyledPara>4 PM</StyledPara>
      </StyledDivider>
      <StyledTime />
      <StyledDivider textAlign="left">
        <StyledPara>5 PM</StyledPara>
      </StyledDivider>
      <StyledTime />
      <StyledDivider textAlign="left">
        <StyledPara>6 PM</StyledPara>
      </StyledDivider>
      <StyledTime />
      <StyledDivider textAlign="left">
        <StyledPara>7 PM</StyledPara>
      </StyledDivider>
      <StyledTime />
      <StyledDivider textAlign="left">
        <StyledPara>8 PM</StyledPara>
      </StyledDivider>
      <StyledTime />
      <StyledDivider textAlign="left">
        <StyledPara>9 PM</StyledPara>
      </StyledDivider>
      <StyledTime />
      <StyledDivider textAlign="left">
        <StyledPara>10 PM</StyledPara>
      </StyledDivider>
      <StyledTime />
      <StyledDivider textAlign="left">
        <StyledPara>11 PM</StyledPara>
      </StyledDivider>
      <StyledTime />
      <StyledDivider textAlign="left">
        <StyledPara>12 PM</StyledPara>
      </StyledDivider>
    </div>
  );
};

export default TimeGutter;
