import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import floodLight from "../../img/floodlight.jpg";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import EventDetails from "./EventDetails";
import SideDetails from "./SideDetails";
import Blur from "./Blur";
import Bar from "./Bar";
import MessageBoard from "./MessageBoard";
import Skeleton from "@mui/material/Skeleton";
import { countUnique, getDate } from "../../utils/utils";
import { SessionContext } from "./SessionContext";

const StyledMainContent = styled.div`
  max-width: 1080px;
  min-height: 500px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 45px;
  height: 100%;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;

  transition: border 280ms cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  -webkit-box-shadow: 0px 4px 4px 0px rgb(60 64 67 / 30%),
    0px 8px 12px 6px rgb(60 64 67 / 15%);
  box-shadow: 0px 4px 4px 0px rgb(60 64 67 / 30%),
    0px 8px 12px 6px rgb(60 64 67 / 15%);

  @media screen and (max-width: 1080px) {
    margin-top: 0;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 200px;

  @media screen and (max-width: 759px) {
    flex-direction: column;
  }
`;

const StyledMainImage = styled.div`
  border-top-left-radius: 20px;
  min-height: 25rem;
  max-height: 50rem;
  width: 60%;
  background-image: url(${floodLight});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  @media screen and (max-width: 759px) {
    width: 100%;
  }

  @media screen and (max-width: 1080px) {
    border-top-left-radius: 0;
  }
`;

const StyledMetaData = styled.div`
  border-top-right-radius: 20px;
  width: 40%;
  background-color: white;
  @media screen and (max-width: 759px) {
    width: 100%;
  }

  @media screen and (max-width: 1080px) {
    border-top-right-radius: 0;
  }
`;

const StyledContent = styled.div`
  height: 30rem;
  display: flex;
  flex-direction: row;
  background-color: white;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;

  @media screen and (max-width: 1080px) {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    flex-direction: row;
    height: 60rem;
    justify-content: space-between;
  }

  @media screen and (max-width: 759px) {
    flex-direction: column;
    justify-content: flex-start;
  }
`;

const StyledChat = styled.div`
  width: 60%;
  height: 400px;
  @media screen and (max-width: 759px) {
    width: 100%;
    height: fit-content;
  } ;
`;

const fetchSessionData = ({ sessionId }) => {
  return fetch(`http://localhost:8080/pitch/sessions/${sessionId}`, {
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

const EventSession = ({ sessionId }) => {
  const [sessionData, setSessionData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    try {
      setIsLoading(true);
      let data = await fetchSessionData({ sessionId });
      setSessionData(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Unable to fetch event session ", error);
      setIsLoading(false);
    }
  }, []);

  return (
    <div>
      <Blur />
      <SessionContext.Provider value={{ session: sessionData }}>
        <StyledMainContent>
          <StyledHeader>
            <StyledMainImage />
            <StyledMetaData>
              {isLoading ? (
                <Box sx={{ m: 4 }}>
                  <Skeleton
                    sx={{ mb: 4 }}
                    variant="rectangular"
                    width={30}
                    height={50}
                  />
                  <Skeleton sx={{ mb: 3 }} width="70%" height={30} />
                  <Skeleton sx={{ mb: 2 }} width="60%" height={20} />
                  <Skeleton sx={{ mb: 2 }} width="30%" height={20} />
                  <Skeleton sx={{ mb: 2 }} width="30%" variant={"text"} />
                </Box>
              ) : (
                <EventDetails
                  title={sessionData.name}
                  startTime={sessionData.start_time}
                  endTime={sessionData.end_time}
                  participants={countUnique(sessionData.players)}
                  price={15}
                  date={sessionData.date}
                />
              )}
            </StyledMetaData>
          </StyledHeader>
          <Bar sessionId={sessionId} />
          <StyledContent>
            <StyledChat>
              <MessageBoard sessionId={sessionId} />
            </StyledChat>
            <Divider variant={"middle"} orientation={"vertical"} flexItem />
            {isLoading ? (
              <Box sx={{ m: 2 }}>
                <Skeleton sx={{ mb: 1 }} width="150px" height={30} />
                <Skeleton sx={{ mb: 1 }} width="100px" height={30} />
                <Skeleton sx={{ mb: 1 }} width="200px" height={50} />
              </Box>
            ) : (
              <SideDetails
                date={`${getDate(
                  sessionData.date
                )} @ ${sessionData.start_time.slice(0, 5)}`}
                location={"A.A Stadium"}
                sessionId={sessionId}
              />
            )}
          </StyledContent>
        </StyledMainContent>
      </SessionContext.Provider>
    </div>
  );
};

export default EventSession;
