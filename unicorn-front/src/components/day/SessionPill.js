import React, { useContext } from "react";
import { Button } from "@mui/material";
import styled from "@emotion/styled";
import SportsIcon from "@mui/icons-material/Sports";
import JoinModal from "../modal/JoinModal";
import { useHistory } from "react-router-dom";
import { PitchContext } from "../pitch/PitchContext";

const StyledPill = styled.div`
  background-color: #cefffd;
  display: flex;
  flex-direction: row;
  //padding: 0 1rem 0 2rem;
  justify-content: space-between;
  border-radius: 4px;
  border: 1px solid #d4d2d2;
  //resize: vertical;
  overflow: auto;
  height: ${(props) => props.height};
  border-left: 7px solid #f62699;
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
  //@media only screen and (max-width: 800px) {
  //  flex-direction: column;
  //  padding-left: 10px;
  //}
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

const StyledButton = styled(Button)`
  padding-right: 3px;
  max-height: 19px;
  min-height: 19px;
  min-width: 100px;
  border-radius: 0 !important;

  @media only screen and (max-width: 800px) {
    margin-bottom: 10px;
  }
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

const SessionPill = ({ name, number, height, sessionId }) => {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState({});
  const [isModalLoading, setIsModalLoading] = React.useState(true);
  const [backEndUrl, setBackEndUrl] = React.useState(process.env.REACT_APP_backEndUrl ||  "http://localhost:8080");
  const { pitch } = useContext(PitchContext);
  const history = useHistory();

  let cap = pitch?.capacity ? pitch.capacity : 22;

  const routeChange = () => {
    let path = `/sessions/${sessionId}`;
    history.push(path);
  };

  const handleOpen = () => {
    fetch(`${backEndUrl}/pitch/sessions/${sessionId}`, {
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
        setData(values);
        setOpen(true);
        setIsModalLoading(false);
      })
      .catch(() => {});
  };
  const handleClose = () => setOpen(false);

  return (
    <StyledPill height={height} onClick={() => console.log("Clicked")}>
      <StyledJoin>
        <StyledName>
          <StyledTitle> {name}</StyledTitle>
          <StyledParagraph>
            {number}/{cap}
          </StyledParagraph>
        </StyledName>
        <StyledVertical>
          <StyledCentered>
            <StyledButton
              size="small"
              variant="contained"
              color={"success"}
              onClick={routeChange}
              endIcon={<SportsIcon />}
            >
              Join!
            </StyledButton>
            <JoinModal
              handleClose={handleClose}
              open={open}
              sessionId={sessionId}
              datum={data}
              loadingState={isModalLoading}
            />
          </StyledCentered>
        </StyledVertical>
      </StyledJoin>
    </StyledPill>
  );
};

export default SessionPill;
