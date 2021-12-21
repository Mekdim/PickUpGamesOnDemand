import React from "react";
import { Avatar, Stack } from "@mui/material";
import styled from "@emotion/styled";

const StyledName = styled.h4`
  text-align: left;
  margin-left: 16px;
  min-width: 240px;
  //max-width: 100%;
  //max-width: 160px;
  font-weight: 400;
  margin-bottom: auto;
  margin-top: auto;

  @media screen and (max-width: 759px) {
    min-width: 180px;
    font-weight: 300;
    margin-left: 8px;
  }
`;

const StyledStatus = styled.p`
  min-width: 75px;
  text-align: left;
  margin-bottom: auto;
  margin-top: auto;
  color: ${(props) => {
    if (props.status === "confirmed") {
      return "green";
    }
    return "red";
  }};
`;

const StyledAvatar = styled(Avatar)`
  background-color: #37b4fc;
  margin-bottom: auto;
  margin-top: auto;
`;

const StyledStack = styled.div`
  min-height: 50px;
  //padding: 5px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
  &:hover {
    background-color: #ebf8f8;
    border-radius: 15px;
  }
`;

const UserLine = ({ name, status = "confirmed" }) => {
  return (
    <StyledStack>
      <StyledAvatar>{name.slice(0, 1)}</StyledAvatar>
      <StyledName> {name}</StyledName>
      {/*<StyledStatus status={status}> {status} </StyledStatus>*/}
    </StyledStack>
  );
};

export default UserLine;
