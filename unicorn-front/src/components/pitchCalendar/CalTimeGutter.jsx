import Divider from '@mui/material/Divider';
import React from 'react';
import styled from '@emotion/styled';

const StyledPara = styled.p`
  font-weight: 600;
  font-size: 11px;
  font-family: 'Ubuntu', sans-serif;
  color: #70757a;
  margin-block-start: 0;
  margin-block-end: 0;
  min-width: 28px;
  max-width: 28px;
`;

const StyledDivider = styled(Divider)`
  ::before {
    width: 0;
  }

  .MuiDivider-wrapper {
    padding-left: 7px;
    padding-right: calc(4px * 1.2);
  }
  min-height: 12px;
  max-height: 12px;
  margin-top: -6.5px !important;
`;

export const CalTimeGutter = ({ time }) => {
  if (time === '12am') {
    time = ''; // don't show 12AM as it will be cut out by the calendar header
  }

  return (
    <StyledDivider textAlign={'left'}>
      <StyledPara>{time}</StyledPara>
    </StyledDivider>
  );
};
