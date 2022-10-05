import React, { useState } from 'react';
import styled from '@emotion/styled';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import InvitationSvg from '../../images/Invitation.svg';
import Link from '@mui/material/Link';
import { clearNotification } from '../logic/logic';
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';

const StyledName = styled.h4`
  text-align: left;
  margin-left: 16px;
  min-width: 150px;
  font-weight: 400;
`;

const StyledStatus = styled.div`
  min-width: 75px;
  text-align: left;
  margin-left: 16px;
  margin-bottom: auto;
  margin-top: auto;
`;

const StyledAvatar = styled.div`
  width: 42px;
  height: 42px;
  margin-bottom: auto;
  margin-top: auto;
`;

const StyledStack = styled.div`
  min-height: 60px;
  padding: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-content: center;
  border-radius: 15px;
  margin: 10px 13px 5px 10px;
  &:hover {
    background-color: #ebf8f8;
    transition: border 280ms cubic-bezier(0.4, 0, 0.2, 1),
      box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
    -webkit-box-shadow: 0px 1px 2px 0px rgb(60 64 67 / 30%),
      0px 1px 3px 1px rgb(60 64 67 / 15%);
    box-shadow: 0px 9px 5px 0px rgb(185 185 185 / 45%),
      0px 1px 3px 1px rgb(60 64 67 / 54%);
  }
`;

const CloseButton = styled.span`
  width: 20px;
  height: 20px;
  text-align: right;
  margin-top: auto;
  position: relative;
  bottom: 57px;
  right: 3px;
  z-index: 4;
  display: ${(props) => {
    return props.show ? props.show : 'none';
  }};
`;

const CloseIonStyled = styled(CloseIcon)`
  //background-color: #ff8585;
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

const NotificationLine = ({
  sessionId,
  type,
  notificationId,
  copiedNotification,
}) => {
  const [display, setDisplay] = useState('none');
  const [state, dispatch] = useStateValue();
  let notify = JSON.parse(JSON.stringify(copiedNotification));
  console.log('Notification id ', sessionId);

  const handleDismiss = async () => {
    try {
      await clearNotification(notificationId);
      let updated = notify.filter((x) => {
        return x.id !== notificationId;
      });
      dispatch({
        type: actionTypes.SET_USER_NOTIFICATIONS,
        userNotifications: updated,
      });
    } catch (error) {
      console.log('Error clearing notification ', error);
    }
  };

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
        <StyledAvatar>
          <InvitationSvg />
        </StyledAvatar>
        <StyledName> {'You have been invited! '}</StyledName>
        <StyledStatus>
          <Link href={`/sessions/${sessionId}`}> Session </Link>
        </StyledStatus>
        <CloseButton show={display}>
          <CloseIonStyledIconButton
            onClick={handleDismiss}
            aria-label="close"
            size="small"
          >
            <CloseIonStyled fontSize={'small'} />
          </CloseIonStyledIconButton>
        </CloseButton>
      </StyledStack>
    </>
  );
};

export default NotificationLine;
