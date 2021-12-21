import * as React from "react";
import Popover from "@mui/material/Popover";
import styled from "@emotion/styled";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import IconButton from "@mui/material/IconButton";
import { useEffect, useMemo, useState } from "react";
import { useStateValue } from "../../StateProvider";
import NotificationLine from "./NotificationLine";
import { Button } from "@mui/material";
import { clearAllNotifications } from "../logic/logic";
import { actionTypes } from "../../reducer";

const StyledPopover = styled(Popover)`
  .MuiPaper-root {
    margin-top: 20px;
    width: 380px;
    min-width: 380px;
    max-width: 380px;
    height: 400px;
    min-height: 400px;
    max-height: 400px;
    padding-bottom: 40px;
    border-radius: 20px;
    background-color: #f5f8fb;
  }
`;

const StyledPickerClear = styled.div`
  flex-direction: row;
  justify-content: flex-end;
  display: flex;
  padding: 10px 10px 10px 0;
  background-color: transparent;
`;

const StyledButton = styled(Button)`
  background-color: white;
  text-transform: none;
  transition: border 280ms cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0px 1px 2px 0px rgb(60 64 67 / 30%),
    0px 1px 3px 1px rgb(60 64 67 / 15%);
  :hover {
    border-color: white;
    background-color: white;
  }
`;

const StyledPopperWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: inherit;
  height: inherit;
`;

const StyledNotificationContainer = styled.div`
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: white;
`;

const StyledEmptyState = styled.p`
  margin-top: 150px;
  text-align: center;
  font-family: "Ubuntu", sans-serif;
  font-weight: 500;
  font-size: x-large;
`;

export default function Notifications() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const [state, dispatch] = useStateValue();
  const [count, setCount] = useState(0);

  let clonedArray = [];
  if (state.userNotifications) {
    clonedArray = JSON.parse(JSON.stringify(state.userNotifications));
  }

  useEffect(() => {
    setCount(state?.userNotifications?.length);
  }, [state]);

  return (
    <>
      <IconButton
        size="large"
        aria-label="show notifications"
        color="inherit"
        onClick={(event) => {
          event.stopPropagation();
          event.preventDefault();
          setCount(0);
          setAnchorEl(event.currentTarget);
        }}
      >
        <Badge badgeContent={count} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <StyledPopover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <StyledPopperWrapper>
          <StyledPickerClear>
            <StyledButton
              variant={"outlined"}
              onClick={async (ev) => {
                ev.preventDefault();
                ev.stopPropagation();
                try {
                  let notificationIds = [];
                  clonedArray.forEach((value) => {
                    notificationIds.push(value.id);
                  });
                  await clearAllNotifications(notificationIds);
                  setCount(0);
                  dispatch({
                    type: actionTypes.SET_USER_NOTIFICATIONS,
                    userNotifications: [],
                  });
                } catch (e) {
                  console.error("Unable to clear notifications ", e);
                }
              }}
            >
              Clear All
            </StyledButton>
          </StyledPickerClear>
          <StyledNotificationContainer>
            {clonedArray.length === 0 && (
              <StyledEmptyState>{"👍 All caught up! 👍"}</StyledEmptyState>
            )}
            {clonedArray.map((notif) => {
              return (
                <NotificationLine
                  key={notif.id}
                  sessionId={notif.entityid}
                  notificationId={notif.id}
                  type={notif.type}
                  copiedNotification={clonedArray}
                />
              );
            })}
          </StyledNotificationContainer>
        </StyledPopperWrapper>
      </StyledPopover>
    </>
  );
}
