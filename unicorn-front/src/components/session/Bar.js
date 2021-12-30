import PrincipalAvatar from "./PrincipalAvatar";
import SportsIcon from "@mui/icons-material/Sports";
import React, { useContext, useMemo, useState } from "react";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import Cookies from "js-cookie";
import { LoadingButton } from "@mui/lab";
import CircularProgress from "@mui/material/CircularProgress";
import { useHistory } from "react-router-dom";
import { SessionContext } from "./SessionContext";
import { refreshTheToken } from "../logic/logic";

const StyledBar = styled.div`
  height: 66px;
  position: -webkit-sticky;
  position: sticky;
  top: 69px;
  background-color: rgb(224 224 224);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 25px;
  padding-right: 25px;
  z-index: 10;

  @media screen and (max-width: 759px) {
    padding-right: 15px;
  }
`;

const StyledButton = styled(LoadingButton)`
  padding-right: 3px;
  max-height: 40px;
  min-height: 40px;
  min-width: 300px;
  transition: border 280ms cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  -webkit-box-shadow: 0px 1px 2px 0px rgb(60 64 67 / 30%),
    0px 1px 3px 1px rgb(60 64 67 / 15%);
  box-shadow: 0px 1px 2px 0px rgb(60 64 67 / 30%),
    0px 1px 3px 1px rgb(60 64 67 / 15%);
  :focus,
  :hover {
    transition: border 280ms cubic-bezier(0.4, 0, 0.2, 1),
      box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
    -webkit-box-shadow: 0px 4px 4px 0px rgb(60 64 67 / 30%),
      0px 8px 12px 6px rgb(60 64 67 / 15%);
    box-shadow: 0px 4px 4px 0px rgb(60 64 67 / 30%),
      0px 8px 12px 6px rgb(60 64 67 / 15%);
  }

  @media screen and (max-width: 759px) {
    min-width: 175px;
  }
`;

const disableButton = ({ joined, sessionData, loggedInUser = null }) => {
  if (joined) {
    return true;
  }

  if (loggedInUser === null || loggedInUser === undefined) {
    return false;
  }

  if (!sessionData || !sessionData.players) {
    return false;
  }

  let user = sessionData.players.find(
    (ply) => Number(ply.player_id) === Number(loggedInUser)
  );
  if (sessionData.players.length == 22){
    return true
  }
  return user !== undefined;
};

const Bar = ({ sessionId }) => {
  const history = useHistory();
  const { session } = useContext(SessionContext);
  const [failed, setFailed] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [joined, setJoined] = useState(false);
  const [backEndUrl, setBackEndUrl] = useState(process.env.REACT_APP_backEndUrl || "http://localhost:8080");
  const disableStatus = useMemo(() => {
    return disableButton({
      joined,
      sessionData: session,
      loggedInUser: Cookies.get("id"),
    });
  }, [session, joined]);

  const handleJoin = (refreshEnabled = true) => {
    let body = {
      session_id: sessionId,
      player_id: Cookies.get("id"),
    };
    if (!body.player_id) {
      // user needs to logIn or signUp
      history.push("/signin");
    }

    setIsJoining(true);
    let bearer_token = Cookies.get('accessToken')
       if (!bearer_token){
          alert(" we couldnt get your stored sessionin  data . Please try logging in again ")
       } 
    fetch(`${backEndUrl}/pitch/joinSession`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + bearer_token,
      },
      body: JSON.stringify(body),
    })
      .then(async (res) => {
        if (res.status == 403 && refreshEnabled) {
          //  return "Token expired error"
          let tokens = await refreshTheToken();
          if (!tokens) {
            console.log(
              "We couldnt get new tokens and refresh token for you. We are not able to let you join session  at the moment."
            );
            setFailed(true);
            setIsJoining(false);
            setJoined(false);
            return;
            //alert("We couldnt get new tokens and refresh token for you. Sorry")
          }
          Cookies.set("accessToken", tokens.accessToken);
          Cookies.set("refreshToken", tokens.refreshToken);
          handleJoin(false);
          return;
        }
        if (!res.ok) {
          throw new Error("Sorry! We are not able to let you join a session");
        }

        setFailed(false);
        setIsJoining(false);
        setJoined(true);
      })
      .catch((error) => {
        console.error("There was an issue joining the session ", error);
        setFailed(true);
        setIsJoining(false);
        setJoined(false);
      });
  };
  return (
    <StyledBar>
      <PrincipalAvatar sessionId={sessionId} />
      <Box sx={{ m: 1, position: "relative" }}>
        <StyledButton
          size="small"
          variant="contained"
          disabled={disableStatus}
          color={"success"}
          loading={isJoining}
          loadingIndicator="Joining..."
          onClick={handleJoin}
          endIcon={<SportsIcon />}
        >
          Join!
        </StyledButton>
        {isJoining && (
          <CircularProgress
            size={24}
            thickness={4}
            sx={{
              color: "green",
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: "-12px",
              marginLeft: "-12px",
            }}
          />
        )}
      </Box>
    </StyledBar>
  );
};

export default Bar;
