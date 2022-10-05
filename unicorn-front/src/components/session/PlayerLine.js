import React, { useCallback, useContext, useState } from 'react';
import { Avatar, Tooltip } from '@mui/material';
import styled from '@emotion/styled';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { SessionContext } from './SessionContext';
import { deleteSession, leaveSession } from './hooks/useLeaveSession';
import { useTranslation } from 'react-i18next';

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
    if (props.status === 'Confirmed') {
      return 'green';
    }
    return '#000000bd';
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

const CloseButton = styled.span`
  width: 20px;
  height: 20px;
  text-align: right;
  margin-top: auto;
  position: relative;
  bottom: 60px;
  right: -9px;
  z-index: 4;
  display: ${(props) => {
    return props.show ? props.show : 'none';
  }};
`;

const CloseIonStyledIconButton = styled(IconButton)`
  background-color: #ff8585;
  transition: border 280ms cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  -webkit-box-shadow: 0px 1px 2px 0px rgb(60 64 67 / 30%),
    0px 1px 3px 1px rgb(60 64 67 / 15%);
  box-shadow: 0px 1px 2px 0px rgb(60 64 67 / 30%),
    0px 1px 3px 1px rgb(60 64 67 / 15%);
  :focus,
  :hover {
    background-color: #f85858;
    transition: border 280ms cubic-bezier(0.4, 0, 0.2, 1),
      box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
    -webkit-box-shadow: 0px 4px 4px 0px rgb(60 64 67 / 30%),
      0px 8px 12px 6px rgb(60 64 67 / 15%);
    box-shadow: 0px 4px 4px 0px rgb(60 64 67 / 30%),
      0px 8px 12px 6px rgb(60 64 67 / 15%);
  }
`;

const PlayerLine = ({
  name,
  status = 'Confirmed',
  close = false,
  playerId,
  players,
  setPlayers,
}) => {
  const [display, setDisplay] = useState('none');
  const { session } = useContext(SessionContext);
  const { t } = useTranslation('main');
  const handleRemove = useCallback(async () => {
    let clonedArray = JSON.parse(JSON.stringify(players));
    if (session) {
      clonedArray = clonedArray.filter((ply) => ply.id !== playerId);
      if (clonedArray.length === 0) {
        try {
          await deleteSession({ sessionId: session.id, playerId: playerId });
          setPlayers(clonedArray);
        } catch (deleteSessionError) {
          console.error('Unable to delete the session ', deleteSessionError);
        }
      } else {
        try {
          // TODO Check for the player status being Invited or Confirmed before changing the number of players in sessions
          await leaveSession(session.id, playerId);
          setPlayers(clonedArray);
        } catch (leaveSessionError) {
          console.error('Unable to leave the session ', leaveSessionError);
        }
      }
    }
  }, [session]);

  return (
    <>
      <StyledStack
        onMouseEnter={(e) => {
          setDisplay('inline-block');
        }}
        onMouseLeave={(e) => {
          setDisplay('none');
        }}
      >
        <StyledAvatar>{name.slice(0, 1)}</StyledAvatar>
        <StyledName> {name}</StyledName>
        <StyledStatus status={status}>
          {t(`session.${status.toLowerCase()}`)}
        </StyledStatus>
        {close && (
          <Tooltip key={1} title={t('session.leave')} placement="left" arrow>
            <CloseButton show={display}>
              <CloseIonStyledIconButton
                onClick={handleRemove}
                aria-label="close"
                size="small"
              >
                <CloseIcon fontSize={'medium'} />
              </CloseIonStyledIconButton>
            </CloseButton>
          </Tooltip>
        )}
      </StyledStack>
    </>
  );
};

export default PlayerLine;
