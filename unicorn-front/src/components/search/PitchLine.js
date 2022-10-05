import React from 'react';
import { Avatar } from '@mui/material';
import styled from '@emotion/styled';

const StyledName = styled.h4`
  text-align: left;
  margin-left: 16px;
  min-width: 150px;
  font-weight: 400;
`;

const StyledStatus = styled.p`
  min-width: 75px;
  text-align: left;
  margin-left: 16px;
  margin-bottom: auto;
  margin-top: auto;
  color: ${(props) => {
    if (props.status === 'confirmed') {
      return 'green';
    }
    return 'red';
  }};
`;

const StyledAvatar = styled(Avatar)`
  background-color: #37b4fc;
  margin-bottom: auto;
  margin-top: auto;
`;

const StyledStack = styled.div`
  min-height: 60px;
  min-width: 330px;
  padding: 5px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
  border-radius: 15px;
  &:hover {
    background-color: #ebf8f8;
  }
`;

const PitchLine = ({ name, status = 'confirmed' }) => {
  return (
    <>
      <StyledStack>
        <StyledAvatar>{name.slice(0, 1)}</StyledAvatar>
        <StyledName> {name}</StyledName>
        <StyledStatus status={status}> {status} </StyledStatus>
      </StyledStack>
    </>
  );
};

export default PitchLine;
