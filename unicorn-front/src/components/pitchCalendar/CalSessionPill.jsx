import React, { useContext, useState } from 'react';
import { Button, Tooltip } from '@mui/material';
import styled from '@emotion/styled';
import SportsIcon from '@mui/icons-material/Sports';
import { useHistory } from 'react-router-dom';
import { PitchContext } from '../pitch/PitchContext';
import Popover from '@mui/material/Popover';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import EventIcon from '@mui/icons-material/Event';
import Draggable from 'react-draggable';
import {
  getDayOfWeek,
  getMonthName,
  getDayOfMonth,
  convertTimeStringToAMPM,
} from '../../utils/utils';
import { deleteSession, leaveSession } from '../session/hooks/useLeaveSession';
import Cookies from 'js-cookie';
import { Alert } from '@mui/lab';

const StyledDiv = styled.div`
  width: 300px;
`;

const StyledTitlePopper = styled.div`
  font-family: 'Ubuntu', Roboto, Arial, sans-serif;
  font-size: 22px;
  font-weight: 400;
  line-height: 28px;
  color: #3c4043;
  max-height: 56px;
  overflow-wrap: break-word;
  word-wrap: break-word;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
const StyledSpan = styled.span`
  font-family: 'Ubuntu', Roboto, Arial, sans-serif;
  font-size: 22px;
  font-weight: 400;
  line-height: 28px;
  color: #3c4043;
  max-height: 56px;
  overflow-wrap: break-word;
  word-wrap: break-word;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const StyledLine = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 8px 0 8px 0;
`;

const StyledIconCentered = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 15px;
`;

const StyledIconCenteredCal = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 9px;
`;

const StyledHeader = styled.div`
  -webkit-box-flex: none;
  -webkit-flex: none;
  flex: none;
  padding: 8px 8px 0 6px;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-flow: row-reverse;
  flex-flow: row-reverse;
  cursor: move;
  background-color: #f1f3f4;
  @media only screen and (max-width: 600px) {
    padding-right: 20px;
  }
`;

const CloseButton = styled.div`
  width: 40px;
  height: 40px;
  text-align: right;
`;

const StyledPill = styled.div`
  background-color: #cefffd;
  display: ${(props) => {
    if (props.hidden) {
      return 'none';
    }
    return 'flex';
  }};
  flex-direction: row;
  justify-content: space-between;
  border-radius: 3px;
  //border: 1px solid #d4d2d2;
  overflow: auto;
  height: 100% !important;
  /* height: {(props) => props.height}; */
  border-left: 4px solid #f62699;
  cursor: pointer;
  @media only screen and (max-width: 600px) {
    padding: 0;
  }
`;

const StyledJoin = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
`;

const StyledName = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
`;

const StyledParagraph = styled.p`
  margin: 0;
  @media only screen and (max-width: 600px) {
    font-size: smaller;
  }
`;

const StyledTitle = styled.h5`
  margin: 0;
  @media only screen and (max-width: 600px) {
    font-size: smaller;
  }
`;
const StyledDetails = styled.div`
  padding: 8px 0 8px 16px;
`;

const StyledColorIndicator = styled.div`
  -webkit-border-radius: 4px;
  border-radius: 4px;
  height: 14px;
  width: 14px;
  margin-left: 3px;
  margin-top: 3px;
  background-color: #61dafb;
`;

const StyledButton = styled(Button)`
  padding-right: 3px;
  max-height: 19px;
  min-height: 19px;
  min-width: 100px;
  border-radius: 0 !important;
`;

const StyledVertical = styled.div`
  display: grid;
  justify-content: end;
`;

const StyledCentered = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  text-align: left;
`;

const StyledPopover = styled(Popover)`
  .MuiPaper-root {
    border-radius: 20px;
    border: 1px solid #c7c7c7;
  }
`;

const StyledDatePopper = styled.div`
  line-height: 20px;
  color: #3c4043;
  font-size: 14px;
  font-weight: 400;
  margin-top: auto;
  margin-bottom: auto;
`;

const StyledEvent = styled(EventIcon)`
  color: #5f6368;
`;

export const CalSessionPill = ({
  name,
  number,
  sessionId,
  isPast = false,
  rawData,
}) => {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentUsersNo, setCurrentUsersNo] = useState(Number(number));
  const [isDeleted, setIsDeleted] = React.useState(false);

  const currentUser = Cookies.get('id');

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setErrorMessage(null);
    setIsError(false);
    setAnchorEl(null);
  };
  const openAnchor = Boolean(anchorEl);
  const id = openAnchor ? 'simple-popover' : undefined;
  const { pitch } = useContext(PitchContext);
  const history = useHistory();

  let cap = pitch?.capacity ? pitch.capacity : 22;

  const routeChange = () => {
    let path = `/sessions/${sessionId}`;
    history.push(path);
  };

  const handleLeaveSession = async (sessionId, playerId) => {
    try {
      await leaveSession(sessionId, playerId);
      setCurrentUsersNo(currentUsersNo - 1);
      handleClose();
    } catch (leaveSessionError) {
      console.error('Unable to leave the session ', leaveSessionError);
      setIsError(true);
      setErrorMessage('Not able to leave the session');
    }
  };

  const handleDeleteSession = async (sessionId, playerId) => {
    try {
      await deleteSession({ sessionId: sessionId, playerId: playerId });
      setIsDeleted(true);
      handleClose();
    } catch (leaveSessionError) {
      console.error('Unable to delete the session ', leaveSessionError);
      setIsError(true);
      setErrorMessage(`Not able to delete Session`);
    }
  };

  return (
    <>
      <StyledPill
        onClick={(e) => {
          e.stopPropagation();
          handleClick(e);
        }}
        hidden={isDeleted}
        isPast={isPast}
      >
        <StyledJoin>
          <StyledName>
            <StyledTitle> {name}</StyledTitle>
            <StyledParagraph>
              {currentUsersNo}/{cap}
            </StyledParagraph>
          </StyledName>
          <StyledVertical>
            <StyledCentered>
              <StyledButton
                size="small"
                variant="contained"
                color={'success'}
                onClick={routeChange}
                endIcon={<SportsIcon />}
                disabled={isPast}
              >
                Join!
              </StyledButton>
            </StyledCentered>
          </StyledVertical>
        </StyledJoin>
      </StyledPill>
      <Draggable
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
      >
        <StyledPopover
          id={id}
          open={openAnchor}
          anchorEl={anchorEl}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <StyledDiv>
            <StyledHeader id="draggable-dialog-title">
              <Tooltip title="Close" placement={'bottom'} arrow>
                <CloseButton>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClose();
                    }}
                    aria-label="close"
                    size="small"
                  >
                    <CloseIcon fontSize={'small'} />
                  </IconButton>
                </CloseButton>
              </Tooltip>
              {rawData.players === 1 && currentUser && (
                <Tooltip title="Delete" placement={'bottom'} arrow>
                  <CloseButton>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteSession(sessionId, currentUser);
                      }}
                      aria-label="close"
                      size="small"
                    >
                      <DeleteOutlineOutlinedIcon
                        fontSize={'small'}
                        color={'warning'}
                      />
                    </IconButton>
                  </CloseButton>
                </Tooltip>
              )}
              {currentUser && (
                <Tooltip title="Leave" placement={'bottom'} arrow>
                  <CloseButton>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLeaveSession(rawData.id, currentUser);
                      }}
                      aria-label="leave"
                      size="small"
                    >
                      <LogoutOutlinedIcon fontSize={'small'} />
                    </IconButton>
                  </CloseButton>
                </Tooltip>
              )}
            </StyledHeader>
            <StyledDetails>
              <StyledLine>
                <StyledIconCentered>
                  <StyledColorIndicator />
                </StyledIconCentered>
                <StyledTitlePopper>
                  <StyledSpan>{rawData.name}</StyledSpan>
                </StyledTitlePopper>
              </StyledLine>
              <StyledLine>
                <StyledIconCenteredCal>
                  <StyledEvent fontSize={'medium'} />
                </StyledIconCenteredCal>
                <StyledDatePopper>{`${getDayOfWeek(
                  rawData.date
                )}, ${getMonthName(rawData.date)} ${getDayOfMonth(
                  rawData.date
                )}`}</StyledDatePopper>
              </StyledLine>
              <StyledLine>
                <StyledIconCenteredCal>
                  <AccessTimeOutlinedIcon fontSize={'medium'} />
                </StyledIconCenteredCal>
                <StyledDatePopper>{`${convertTimeStringToAMPM(
                  rawData.startTime
                )} -${convertTimeStringToAMPM(
                  rawData.endTime
                )}`}</StyledDatePopper>
              </StyledLine>
            </StyledDetails>
            {isError && <Alert severity={'error'}> {errorMessage} </Alert>}
          </StyledDiv>
        </StyledPopover>
      </Draggable>
    </>
  );
};
