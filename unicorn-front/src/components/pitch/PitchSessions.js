import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Paper } from "@mui/material";
import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import Calendar from "../day/Calendar";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddModal from "../modal/AddModal";
import { addDay, convertToDateString, subtractDay } from "../../utils/utils";
import SkipPreviousRoundedIcon from "@mui/icons-material/SkipPreviousRounded";
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";
import { topShiftMultiplier } from "../../utils/utils";
import PitchMetaData from "./PitchMetaData";
import SessionPill from "../day/SessionPill";
import { fetchEvents } from "./pitchHelper";
import { PitchContext } from "./PitchContext";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useStateValue } from "../../StateProvider";
import usePitchData from "./hooks/usePitchData";

const StyledDate = styled.p`
  line-height: 32px;
  position: relative;
  z-index: 4;
  color: #2d2d2d;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.8px;
  //margin-left: 0;
  //margin-top: 8px;
  text-indent: 0.8px;
  text-transform: uppercase;
  margin: 0;
  width: 100%;
`;

const StyledPrevButton = styled(IconButton)`
  :hover {
    border-radius: 15px 0 0 0;
  }
  height: 60px;
  margin-right: 23px;
  border-radius: 15px 0 0 0;
  border: 1px solid #d4d4d4;
  border-right: 0 !important;
  border-bottom: 0 !important;
`;

const StyledNextButton = styled(IconButton)`
  :hover {
    border-radius: 0 15px 0 0;
  }
  height: 60px;
  z-index: 10;
  background-color: white;
  border-radius: 0 15px 0 0;
  border: 1px solid #d4d4d4;
  border-left: 0 !important;
  border-bottom: 0 !important;
`;

const addButton = {
  width: 60,
  height: 60,
};

const StyledAddIcon = styled(AddCircleIcon)`
  width: 1.5em;
  height: 1.5em;
`;

const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  //padding-left: 72px;
`;

const StyledClip = styled(Paper)`
  border: 1px solid #d4d4d4;
  width: 50%;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  margin-bottom: -2px;
  padding-bottom: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  z-index: 10;
  border-bottom: 2px solid white;
  background-color: white;
  box-shadow: 0px 11px 15px -7px rgb(0 0 0 / 10%);
  min-height: 50px;
  height: 60px;
`;

const GridStyled = styled(Grid)`
  align-items: stretch;
  height: 100%;
  //margin: 0;
`;

const LastDay = styled(StyledClip)`
  margin-right: -40px;
  border-right: 0;

  p {
    margin-left: -8px;
  }
`;

const GridStyledItemInfo = styled(Grid)`
  padding-bottom: 16px;
  padding-right: 8px;
`;

const GridStyledItemCalendar = styled(Grid)`
  padding-bottom: 16px;
  padding-left: 16px !important;
  padding-right: 16px;
`;

const StyledCenter = styled.div`
  display: grid;
  height: 100%;
  //background-color: #b9fdb2;
  background-color: white;
  position: relative;
`;
const StyledDiv = styled.div`
  background-color: whitesmoke;
  //margin-top: auto;
  margin-bottom: auto;
  width: 100%;
`;

const StyledCal = styled(Paper)`
  background-color: white;
  border: 1px solid #d4d4d4;
  height: 63vh;
  overflow-y: auto;
  border-radius: 8px;
  box-shadow: 0px 11px 15px -7px rgb(0 0 0 / 20%);

  direction: ltr;
  padding: 1rem 0 1rem 0;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: #e4e4e4;
    border-radius: 40px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 100px;
    background-image: linear-gradient(180deg, #d0368a 0%, #708ad4 99%);
    box-shadow: inset 2px 2px 5px 0 rgba(#fff, 0.5);
  }
`;

const StyledTitle = styled.h2`
  font-family: "Ubuntu", sans-serif;
  margin-block-start: 0;
  margin-block-end: 0;
`;

const StyledButton = styled.div`
  border: 1px solid #8d8b8b;
  position: absolute;
  bottom: -10px;
  right: -7px;
  background-color: white;
  border-radius: 50%;
  z-index: 52;
  cursor: pointer;
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
    background-color: #f6fafe;
  }
`;

const StyledEvent = styled.div`
  position: absolute;
  top: ${(props) => {
    return props.top ? props.top : 0;
  }}px;
  left: -2px;
  width: 99%;
  z-index: 1;
`;

const eventGeneratorWrapper = (events, height) => {
  const currentEvents = events[0];
  const tomorrowEvents = events[1];
  const thirdDayEvents = events[2];
  const fourthDayEvents = events[3];
  let todayValues = new Array(24).fill(null);
  let tomorrowValues = new Array(24).fill(null);
  let thirdDayValues = new Array(24).fill(null);
  let fourthDayValues = new Array(24).fill(null);

  if (currentEvents && currentEvents.length !== 0) {
    currentEvents.map((val) => {
      eventGenerator(val, todayValues, height, val.id);
    });
  }

  if (tomorrowEvents && tomorrowEvents.length !== 0) {
    tomorrowEvents.map((val) => {
      eventGenerator(val, tomorrowValues, height, val.id);
    });
  }

  if (thirdDayEvents && thirdDayEvents.length !== 0) {
    thirdDayEvents.map((val) => {
      eventGenerator(val, thirdDayValues, height, val.id);
    });
  }

  if (fourthDayEvents && fourthDayEvents.length !== 0) {
    fourthDayEvents.map((val) => {
      eventGenerator(val, fourthDayValues, height, val.id);
    });
  }

  return [todayValues, tomorrowValues, thirdDayValues, fourthDayValues];
};

const eventGenerator = (data, values, height, id) => {
  let index = Number(data.start_time.split(":")[0]);
  let shift = topShiftMultiplier(Number(data.start_time.split(":")[1]));

  let newSession = (
    // Total height of view / 24 hours and also divided again in to 15 mins chunk
    // then a shift value of 0, 1, 2, 3 multiplied with to start at 0, 15, 30 and 45 mark
    // -6 px subtracted to accommodate the divider
    <StyledEvent id={`event-${id}`} top={(height / 24 / 4) * shift - 6}>
      <SessionPill
        height={(height / 24) * (data.duration / 3600000) + "px"}
        name={data.name}
        number={data.number_of_players}
        sessionId={data.id}
      />
    </StyledEvent>
  );
  let prev = values[index];

  if (prev === null) {
    values[index] = newSession;
  } else if (prev.length) {
    values[index] = [...prev, newSession];
  } else {
    values[index] = [prev, newSession];
  }
};

const PitchSession = ({ pitchId, date }) => {
  const [{ homeFields }] = useStateValue();
  const [height, setHeight] = useState(0);
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(date);
  const [backEndUrl, setBackEndUrl] = useState(process.env.backEndUrl || "http://localhost:8080");
  const history = useHistory();
  const [nextDate, setNextDate] = useState(
    addDay({ date: date, numberOfDays: 1 })
  );
  const [secondNextDate, setSecondNextDate] = useState(
    addDay({ date: date, numberOfDays: 2 })
  );
  const [thirdNextDate, setThirdNextDate] = useState(
    addDay({ date: date, numberOfDays: 3 })
  );
  const theme = useTheme();
  const smallest = useMediaQuery(theme.breakpoints.down("sm"));
  const small = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const medium = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const large = useMediaQuery(theme.breakpoints.up("lg"));

  const handleOpen = () => {
    // redirect if not loggedin
    if (!Cookies.get("id")) {
      history.push("/signin");
    } else {
      setOpen(true);
    }
  };
  const handleClose = () => setOpen(false);

  const { pitch, isLoading, isError } = usePitchData(pitchId);

  useEffect(() => {
    fetch(`${backEndUrl}/pitch/${pitchId}/${date}/sessions/days`, {
      method: "GET",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then((data) => {
        setEvents(data);
        document
          .getElementById("mid-day")
          .scrollIntoView({ behavior: "smooth", block: "center" });
      })
      .catch(() => {
        setEvents([[], [], [], []]);
      });
  }, []);

  const dayRef = useCallback((node) => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);

  const eventUpdate = useMemo(
    () => eventGeneratorWrapper(events, height),
    [events]
  );
  /**
   *  Fetch data from db about the sessions
   *  [{start, duration, name, [people-user-names]}]
   *
   */

  return (
    <>
      <PitchContext.Provider
        value={{ pitch, setEvents, setNextDate, setCurrentDate }}
      >
        <GridStyled container spacing={1}>
          <Grid item xs={12}>
            <StyledTitle>
              Join your teammates in a Session or create your own!
            </StyledTitle>
          </Grid>
          <GridStyledItemInfo item xs={12} md={3}>
            <StyledCenter>
              <PitchMetaData pitchId={pitchId} />
            </StyledCenter>
          </GridStyledItemInfo>
          <GridStyledItemCalendar item xs={12} md={9}>
            <StyledCenter>
              <StyledRow>
                <StyledPrevButton
                  aria-label="Previous"
                  onClick={async () => {
                    let prevDay = subtractDay({
                      date: currentDate,
                      numberOfDays: 1,
                    });
                    let previousDayEvents = await fetchEvents({
                      date: prevDay,
                      pitchId: pitchId,
                    });
                    setNextDate(currentDate);
                    setCurrentDate(prevDay);
                    setSecondNextDate(
                      addDay({
                        date: currentDate,
                        numberOfDays: 1,
                      })
                    );
                    setThirdNextDate(
                      addDay({
                        date: currentDate,
                        numberOfDays: 2,
                      })
                    );
                    setEvents(previousDayEvents);
                  }}
                >
                  <SkipPreviousRoundedIcon fontSize={"large"} />
                </StyledPrevButton>
                <StyledClip elevation={24}>
                  <StyledDate> {convertToDateString(currentDate)}</StyledDate>
                </StyledClip>
                {small && (
                  <LastDay>
                    <StyledDate>{convertToDateString(nextDate)}</StyledDate>
                  </LastDay>
                )}
                {(medium || large) && (
                  <StyledClip>
                    <StyledDate>{convertToDateString(nextDate)}</StyledDate>
                  </StyledClip>
                )}
                {medium && (
                  <LastDay>
                    <StyledDate>
                      {convertToDateString(secondNextDate)}
                    </StyledDate>
                  </LastDay>
                )}
                {large && (
                  <StyledClip>
                    <StyledDate>
                      {convertToDateString(secondNextDate)}
                    </StyledDate>
                  </StyledClip>
                )}
                {large && (
                  <LastDay>
                    <StyledDate>
                      {convertToDateString(thirdNextDate)}
                    </StyledDate>
                  </LastDay>
                )}
                <StyledNextButton
                  aria-label="Next"
                  onClick={async () => {
                    let nextNextDay = addDay({
                      date: nextDate,
                      numberOfDays: 1,
                    });
                    let nextDayEvents = await fetchEvents({
                      date: nextDate,
                      pitchId: pitchId,
                    });
                    setCurrentDate(nextDate);
                    setNextDate(nextNextDay);
                    setSecondNextDate(
                      addDay({
                        date: nextNextDay,
                        numberOfDays: 1,
                      })
                    );
                    setThirdNextDate(
                      addDay({
                        date: nextNextDay,
                        numberOfDays: 2,
                      })
                    );
                    setEvents(nextDayEvents);
                  }}
                >
                  <SkipNextRoundedIcon fontSize={"large"} />
                </StyledNextButton>
              </StyledRow>
              <StyledDiv>
                <StyledCal elevation={24}>
                  <div ref={dayRef}>
                    <Calendar
                      height={height}
                      events={eventUpdate}
                      calendarDays={smallest ? 1 : small ? 2 : medium ? 3 : 4}
                    />
                  </div>
                </StyledCal>
              </StyledDiv>
              <StyledButton>
                <IconButton
                  color="primary"
                  aria-label="Create Session"
                  component="span"
                  style={addButton}
                  onClick={handleOpen}
                >
                  <StyledAddIcon color="blue" fontSize="large" />
                </IconButton>
              </StyledButton>
              <AddModal
                open={open}
                handleClose={handleClose}
                pitchId={pitchId}
              />
            </StyledCenter>
          </GridStyledItemCalendar>
        </GridStyled>
      </PitchContext.Provider>
    </>
  );
};

export default PitchSession;
