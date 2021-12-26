import React, { useMemo, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "@emotion/styled";
import DialogContent from "@mui/material/DialogContent";
import PlayerLine from "../session/PlayerLine";
import { Box, Button, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import AutoComplete from "./AutoComplete";
import DialogActions from "@mui/material/DialogActions";
import SportsIcon from "@mui/icons-material/Sports";
import CircularProgress from "@mui/material/CircularProgress";
import Player from "../icons/Player";
import Cookies from "js-cookie";
import { refreshTheToken } from "../logic/logic";

const StyledParticipantButton = styled(Button)`
  padding-right: 3px;
  max-height: 40px;
  min-height: 40px;
  min-width: 175px;
  background-color: #1062fe;
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
    background-color: #1458ce;
  }

  @media screen and (max-width: 759px) {
    min-width: 175px;
  }
`;
const StyledTitle = styled.p`
  //font-family: "Nova Mono", monospace;
  font-family: "Roboto", sans-serif;
  text-align: center;
  width: 100%;
`;

const StyledDialog = styled(Dialog)`
  .MuiPaper-root {
    font-family: "Roboto", sans-serif;
    min-height: 450px;
    border-radius: 15px;
    padding: 20px;
    padding-top: 0;
  }

  @media screen and (max-width: 759px) {
    padding: 0;
  }
`;

const ModalTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const CloseButton = styled.div`
  width: 50px;
  height: 50px;
  text-align: right;
`;

const StyledDialogTitle = styled(DialogTitle)`
  padding: 6px 6px 0 0;
`;

const handleInvite = ({ selected, handleClose, sessionId }, refreshEnabled=true) => {
  let bearer_token = Cookies.get('accessToken')
       if (!bearer_token){
          alert(" we couldnt get your stored sessionin  data . Please try logging in again ")
       } 
  let backEndUrl = process.env.backEndUrl || "http://localhost:8080"
  return fetch(`${backEndUrl}/users/invite/${sessionId}`, {
    method: "POST",
    body: JSON.stringify(selected),
    headers: {
      "Content-Type": "application/json",
      "Authorization":  'Bearer ' + bearer_token
    },
  })
    .then(async (res) => {
      if (res.status == 403 && refreshEnabled) {
         
        //  return "Token expired error"
        let tokens = await refreshTheToken()
          if (!tokens){
            console.log("We couldnt get new tokens and refresh token for you. We are not able to invite players for you.")
            
            return
            //alert("We couldnt get new tokens and refresh token for you. Sorry")
          }
          Cookies.set('accessToken', tokens.accessToken)
          Cookies.set('refreshToken', tokens.refreshToken)
          // try one more time with refreshing token disabled this time
          handleInvite({selected:selected, handleClose:handleClose, sessionId:sessionId},false)
          return

      }
      if (!res.ok) {
        throw new Error("Sorry! Invitations not sent");
      }
      return res.json();
    })
    .then((values) => {
      handleClose();
    })
    .catch(() => {});
};

const ParticipantsModal = ({ open, handleClose, players, sessionId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState([]);
  const [backEndUrl, setBackEndUrl] = React.useState("http://localhost:8080");
  return (
    <StyledDialog onClose={handleClose} open={open}>
      <StyledDialogTitle>
        <ModalTitle>
          <StyledTitle> Invite your friends </StyledTitle>
          <CloseButton>
            <IconButton onClick={handleClose} aria-label="close" size="middle">
              <CloseIcon fontSize={"middle"} />
            </IconButton>
          </CloseButton>
        </ModalTitle>
      </StyledDialogTitle>
      <DialogContent sx={{ p: 0 }} dividers>
        <AutoComplete players={players} setPlayers={setValue} />
      </DialogContent>
      <DialogActions>
        <Box sx={{ m: 1, position: "relative" }}>
          <StyledParticipantButton
            size="small"
            variant="contained"
            endIcon={<Player />}
            onClick={() =>
              handleInvite({ selected: value, handleClose, sessionId })
            }
          >
            Invite Players
          </StyledParticipantButton>
          {isLoading && (
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

export default ParticipantsModal;
