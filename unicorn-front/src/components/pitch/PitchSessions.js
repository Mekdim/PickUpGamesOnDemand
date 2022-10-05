import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Grid from '@mui/material/Grid';
import Calendar from '../day/Calendar';
import IconButton from '@mui/material/IconButton';
import AddModal from '../modal/AddModal';
import { addDay, subtractDay, topShiftMultiplier } from '../../utils/utils';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import PitchMetaData from './PitchMetaData';
import SessionPill from '../day/SessionPill';
import { fetchBoth } from './pitchHelper';
import { PitchContext } from './PitchContext';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import usePitchData from './hooks/usePitchData';
import CalendarHeader from '../day/CalendarHeader';
import {
  GridStyled,
  GridStyledItemCalendar,
  GridStyledItemInfo,
  StyledAddIcon,
  StyledButton,
  StyledCal,
  StyledCenter,
  StyledDiv,
  StyledEvent,
  StyledNextButton,
  StyledPrevButton,
  StyledRow,
  StyledTitle,
} from './style/PitchSessionStyle';

const addButton = {
  width: 60,
  height: 60,
};

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
  let index = Number(data.start_time.split(':')[0]);
  let shift = topShiftMultiplier(Number(data.start_time.split(':')[1]));
  let newSession = (
    // Total height of view / 24 hours and also divided again in to 15 mins chunk
    // then a shift value of 0, 1, 2, 3 multiplied with to start at 0, 15, 30 and 45 mark
    // -1 px subtracted to accommodate the divider
    <StyledEvent id={`event-${id}`} top={(height / 24 / 4) * shift - 1}>
      <SessionPill
        height={
          (height / 24) * (Number(data.duration) / 3600000).toFixed(2) + 'px'
        }
        name={data.name}
        number={data.number_of_players}
        sessionId={data.id}
        rawData={data}
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
  const [height, setHeight] = useState(0);
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [openingHours, setOpeningHours] = useState([]);
  const [currentDate, setCurrentDate] = useState(date);

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
  const smallest = useMediaQuery(theme.breakpoints.down('sm'));
  const small = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const medium = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const large = useMediaQuery(theme.breakpoints.up('lg'));

  const handleOpen = () => {
    // redirect if not loggedin
    if (!Cookies.get('id')) {
      history.push('/signin');
    } else {
      setOpen(true);
    }
  };
  const handleClose = () => setOpen(false);

  const { pitch, isError } = usePitchData(pitchId);

  useEffect(async () => {
    let nextDayAll = await fetchBoth({ date: date, pitchId: pitchId });
    setEvents(nextDayAll[0]); // events set
    setOpeningHours(nextDayAll[1]); // openingHours set
    document
      .getElementById('mid-day')
      .scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, []);

  const dayRef = useCallback(
    (node) => {
      if (node !== null) {
        setHeight(node.getBoundingClientRect().height);
      }
    },
    [events, openingHours]
  );

  const eventUpdate = useMemo(
    () => eventGeneratorWrapper(events, height),
    [events]
  );
  /**
   *  Fetch data from db about the sessions
   *  [{start, duration, name, [people-user-names]}]
   *
   */
  if (isError) {
    return history.push('/');
  }

  return (
    <>
      <PitchContext.Provider
        value={{
          pitch,
          setEvents,
          setNextDate,
          setSecondNextDate,
          setThirdNextDate,
          setCurrentDate,
          setOpeningHours,
        }}
      >
        <GridStyled container spacing={1}>
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
                    let previousDayAll = await fetchBoth({
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
                    setEvents(previousDayAll[0]);
                    setOpeningHours(previousDayAll[1]);
                  }}
                >
                  <SkipPreviousRoundedIcon fontSize={'large'} />
                </StyledPrevButton>
                <CalendarHeader
                  medium={medium}
                  large={large}
                  small={small}
                  currentDate={currentDate}
                  nextDate={nextDate}
                  secondNextDate={secondNextDate}
                  thirdNextDate={thirdNextDate}
                />
                <StyledNextButton
                  aria-label="Next"
                  onClick={async () => {
                    let nextNextDay = addDay({
                      date: nextDate,
                      numberOfDays: 1,
                    });
                    let nextDayAll = await fetchBoth({
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
                    setEvents(nextDayAll[0]);
                    setOpeningHours(nextDayAll[1]);
                  }}
                >
                  <SkipNextRoundedIcon fontSize={'large'} />
                </StyledNextButton>
              </StyledRow>
              <StyledDiv>
                <StyledCal elevation={24}>
                  <div ref={dayRef}>
                    <Calendar
                      height={height}
                      events={eventUpdate}
                      calendarDays={smallest ? 1 : small ? 2 : medium ? 3 : 4}
                      hours={openingHours}
                      click={handleOpen}
                      dates={[
                        currentDate,
                        nextDate,
                        secondNextDate,
                        thirdNextDate,
                      ]}
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
