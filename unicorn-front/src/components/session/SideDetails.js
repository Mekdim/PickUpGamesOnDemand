import Player from "../icons/Player";
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import InvitePlayers from "../modal/InvitePlayers";

const StyledParticipantButton = styled(Button)`
  padding-right: 3px;
  max-height: 40px;
  min-height: 40px;
  min-width: 245px;
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

const StyledSideDetails = styled.div`
  width: 30%;
  height: 400px;
  padding: 15px 10px 0px 10px;

  @media screen and (max-width: 759px) {
    width: inherit;
  } ;
`;

const ComposedField = styled.div`
  display: flex;
  flex-direction: column;
`;
const ComposedTitle = styled.p`
  text-align: left;
  margin-top: 25px;
  margin-bottom: 3px;
  margin-left: 4px;
  font-size: 12px;
  color: #5a5959;
`;

const StyledFiledValue = styled.h5`
  padding-left: 3px;
  min-width: 245px;
  text-align: left;
  font-size: 17px;
  font-weight: 400;
  margin-top: 0;
  margin-bottom: 0;
`;

const fetchUsers = () => {
  let backEndUrl = process.env.REACT_APP_backEndUrl || "http://localhost:8080"
  return fetch(`${backEndUrl}/users/all`, {
    method: "GET",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(
          "Sorry! We are not able to create a session for you at the moment. Try again later"
        );
      }
      return res.json();
    })
    .then((values) => {
      return values;
    })
    .catch(() => {});
};

const SideDetails = ({ date, location, sessionId }) => {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [backEndUrl, setBackEndUrl] = useState("http://localhost:8080");
  useEffect(async () => {
    try {
      let allUsers = await fetchUsers();
      setUsers(allUsers);
    } catch (error) {
      console.error("Issue with fetching users ", error);
    }
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <StyledSideDetails>
      <ComposedField>
        <ComposedTitle>Date and Time</ComposedTitle>
        <StyledFiledValue>{date}</StyledFiledValue>
      </ComposedField>
      <ComposedField>
        <ComposedTitle>Location</ComposedTitle>
        <StyledFiledValue>{location}</StyledFiledValue>
      </ComposedField>
      <ComposedField>
        <ComposedTitle> Add Participants! </ComposedTitle>
        <StyledParticipantButton
          size="small"
          variant="contained"
          endIcon={<Player />}
          onClick={handleOpen}
        >
          Invite Players
        </StyledParticipantButton>
        <InvitePlayers
          open={open}
          handleClose={handleClose}
          players={users}
          sessionId={sessionId}
        />
      </ComposedField>
    </StyledSideDetails>
  );
};

export default SideDetails;
