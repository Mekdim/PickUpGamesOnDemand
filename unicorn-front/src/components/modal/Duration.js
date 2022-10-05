import * as React from 'react';
import styled from '@emotion/styled';
import SportsScoreTwoToneIcon from '@mui/icons-material/SportsScoreTwoTone';
import SportsSharpIcon from '@mui/icons-material/SportsSharp';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { convertTimeStringToAMPM } from '../../utils/utils';

const StyledDuration = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const StyledCenter = styled.div`
  display: grid;
  height: 100%;
  position: relative;
  width: 100%;
  margin-left: 4px;
`;

const StyledLine = styled.div`
  border: 1px dotted;
  border-radius: 50%;
`;

const StyledTimeLine = styled.div`
  border-top: 2px solid #b4b4b4;
  position: absolute;
  top: ${(props) => {
    return props.top ? props.top : 19;
  }}px;

  width: 94%;
  border-radius: 10px;
`;

const StyledCircle = styled.div`
  background: white;
  position: absolute;
  top: ${(props) => {
    return props.top ? props.top : 10;
  }}px;
  border-radius: 50%;
  height: 20px;
  width: 20px;
  z-index: 2;
`;

const StyledTimeLineBox = styled.div`
  flex-direction: row;
  display: flex;
  justify-content: flex-start;
  height: 42px;
  align-items: center;
`;

const StyledBall = styled(SportsSoccerIcon)`
  // Enable rotating ball here
  animation: rotating 4s linear 2;

  @-webkit-keyframes rotating /* Safari and Chrome */ {
    from {
      -webkit-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes rotating {
    from {
      -ms-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -ms-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

const Duration = ({ startTime, endTime }) => {
  return (
    <StyledDuration>
      <Tooltip title="Session Start time!" placement="bottom" arrow>
        <Chip
          icon={<SportsSharpIcon fontSize={'medium'} />}
          label={convertTimeStringToAMPM(startTime)}
          color={'success'}
          variant={'outlined'}
        />
      </Tooltip>
      <StyledCenter>
        <StyledTimeLineBox>
          <StyledCircle>
            <StyledBall fontSize={'small'} />
          </StyledCircle>
          <StyledTimeLine />
        </StyledTimeLineBox>
      </StyledCenter>
      <Tooltip title="Session End time!" placement="bottom" arrow>
        <Chip
          icon={<SportsScoreTwoToneIcon fontSize={'medium'} />}
          label={convertTimeStringToAMPM(endTime)}
          color={'error'}
          variant={'outlined'}
        />
      </Tooltip>
    </StyledDuration>
  );
};

export default Duration;
