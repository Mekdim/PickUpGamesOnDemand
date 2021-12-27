import React, { useState } from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Skeleton from "@mui/material/Skeleton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "@emotion/styled";
import SportsIcon from "@mui/icons-material/Sports";
import { makeStyles } from "@mui/styles";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import LoadingButton from "@mui/lab/LoadingButton";
import CircularProgress from "@mui/material/CircularProgress";
import Cookies from "js-cookie";
import Pitch from "../../img/pitch.jpg";
import Duration from "./Duration";
import { refreshTheToken } from "../logic/logic";
const StyledButton = styled(LoadingButton)`
  margin: 5px;
  max-height: 40px;
  min-height: 40px;
  min-width: 100px;
`;

const StyledTitle = styled.p`
  font-family: "Nova Mono", monospace;
  //font-family: 'Roboto', sans-serif;
`;

const StyledDialog = styled(Dialog)`
  background-size: cover;
  .MuiPaper-root-MuiDialog-paper {
    border: 5px solid red;
    background-image: url(Pitch);
    //background-image: url(http://www.birds.com/wp-content/uploads/home/bird4.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    font-family: "Roboto", sans-serif;
  }
`;

const Debug = styled.div`
  .makeStyles-timeline-2 {
    margin-left: -175px;
  }
`;

const useStyles = makeStyles({
  root: {
    "& .super-app-theme--header": {
      backgroundColor: "rgb(175 169 169)",
      color: "black",
    },
  },
});

const transform = (players) => {
  let result = [];
  players.map((player, index) => {
    result.push({ id: index, col1: player.player_id });
  });
  return result;
};

const JoinModal = ({
  open,
  handleClose,
  sessionId,
  datum,
  loadingState = true,
}) => {
  const classes = useStyles();
  const [isJoining, setIsJoining] = useState(false);

  const data = datum;
  const rows = transform(datum.players ? datum.players : []);

  const handleJoin = (refreshEnabled=true) => {
    
    setIsJoining(true);
    let body = {
      session_id: sessionId,
      player_id: Cookies.get("id"),
    };
    let bearer_token = Cookies.get('accessToken')
       if (!bearer_token){
          alert(" we couldnt get your stored sessionin  data . Please try logging in again ")
       } 
    let backEndUrl = process.env.REACT_APP_backEndUrl || "http://localhost:8080"
    fetch(`${backEndUrl}/pitch/joinSession`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization":  'Bearer ' + bearer_token
      },
      body: JSON.stringify(body),
    }).then(async(res) => {

        if (res.status == 403 && refreshEnabled) {
         
          //  return "Token expired error"
          let tokens = await refreshTheToken()
            if (!tokens){
              console.log("We couldnt get new tokens and refresh token for you. We are not able to let you join session  at the moment.")
              setIsJoining(false);
              handleClose();
              return
              //alert("We couldnt get new tokens and refresh token for you. Sorry")
            }
            Cookies.set('accessToken', tokens.accessToken)
            Cookies.set('refreshToken', tokens.refreshToken)
            handleJoin(false)
            return

        }
        if (!res.ok) {
          throw new Error(
            "Sorry! We are not able to let you join a session"
          );
        }
        setIsJoining(false);
        handleClose();
      }).catch((error) => {
        alert("Sorry! We are not able to let you join a session")
        setIsJoining(false);
        handleClose();
      });
  };

  return (
    <StyledDialog onClose={handleClose} open={open}>
      <DialogTitle>
        <StyledTitle> Join {data.name} Session!</StyledTitle>
      </DialogTitle>
      <DialogContent>
        {loadingState ? (
          <Box>
            <Skeleton width="60%" />
            <Skeleton />
            <Skeleton variant="rectangular" width={210} height={118} />
          </Box>
        ) : (
          <Debug>
            <Duration endTime={data.end_time} startTime={data.start_time} />
            <div
              style={{
                height: 400,
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ display: "flex", height: "100%" }}>
                <div style={{ flexGrow: 1 }} className={classes.root}>
                  <DataGrid
                    style={{ border: "2px solid #007FFF" }}
                    columns={[
                      {
                        field: "col1",
                        headerName: "Players",
                        headerClassName: "super-app-theme--header",
                        headerAlign: "center",
                        width: 150,
                        flex: 1,
                      },
                    ]}
                    rows={rows}
                  />
                </div>
              </div>
            </div>
          </Debug>
        )}
      </DialogContent>
      <DialogActions>
        <Box sx={{ m: 1, position: "relative" }}>
          <StyledButton
            size="small"
            variant="contained"
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
      </DialogActions>
    </StyledDialog>
  );
};

export default JoinModal;
