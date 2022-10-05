import React, { useEffect, useState } from 'react';
import {
  Divider,
  FormControlLabel,
  FormGroup,
  Stack,
  Switch,
} from '@mui/material';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterMoment';
import MobileTimePicker from '@mui/lab/MobileTimePicker';
import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';

const StyledTextFiled = styled(TextField)`
  width: 100%;
  min-width: 200px;
`;

const StyledGroup = styled(FormGroup)`
  margin-bottom: auto !important;
  margin-top: auto !important;
  min-width: 114px !important;
`;

const StyledDivider = styled(Divider)`
  width: 12px;
  margin: auto 8px auto 8px !important;
  background-color: #575757;

  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

const StyledDayOfWeek = styled.h4`
  min-width: 120px;
  font-family: 'Ubuntu', sans-serif;
`;

const StyledTimePicker = styled(MobileTimePicker)`
  min-width: 200px;
`;

const StyledStack = styled(Stack)`
  @media only screen and (max-width: 600px) {
    flex-wrap: wrap;

    .MuiFormGroup-root {
      width: 50% !important;
    }

    p:first-of-type {
      width: 50%;
    }
  }
`;

const OpenHourDay = ({ day, update }) => {
  const { moment } = new DateAdapter();
  const [startTime, setStartTime] = useState(
    // new Date('2018-01-01T08:00:00.000Z')
    moment('2018-01-01T08:00:00.000')
    // null
  );
  const [endTime, setEndTime] = useState(moment('2018-01-01T18:00:00.000'));
  const [startTimeDB, setStartTimeDB] = useState('08:00');
  const [endTimeDB, setEndTimeDB] = useState('18:00');
  const [enabled, setEnabled] = useState(true);
  const [endTimeDisabled, setEndTimeDisabled] = useState(false);

  useEffect(() => {
    let line = {
      day: day,
      enabled: enabled,
      startTime: startTimeDB,
      endTime: endTimeDB,
    };
    if (day) {
      update(`${day}`, line);
    }
  }, [startTime, endTime, enabled]);

  return (
    <StyledStack direction="row">
      <StyledDayOfWeek>{day}</StyledDayOfWeek>
      <StyledGroup>
        <FormControlLabel
          control={
            <Switch
              defaultChecked={enabled}
              onChange={() => {
                setEnabled(!enabled);
              }}
            />
          }
          label={enabled ? 'Open' : 'Closed'}
        />
      </StyledGroup>

      {enabled && (
        <>
          <LocalizationProvider
            dateAdapter={DateAdapter}
            className="LocalizationProvider"
          >
            <StyledTimePicker
              label="Start Time"
              value={startTime}
              disabled={!enabled}
              minutesStep={15}
              onChange={(newValue) => {
                setStartTimeDB(moment(newValue).format('HH:mm'));
                setStartTime(newValue);
                setEndTimeDisabled(false);
              }}
              renderInput={(params) => (
                <StyledTextFiled variant="filled" {...params} />
              )}
            />
          </LocalizationProvider>
          <StyledDivider flexItem orientation={'horizontal'} />
          <LocalizationProvider
            dateAdapter={DateAdapter}
            className="LocalizationProvider"
          >
            <StyledTimePicker
              label="End Time"
              disabled={endTimeDisabled || !enabled}
              minTime={startTime}
              value={endTime}
              minutesStep={15}
              onChange={(newValue) => {
                setEndTimeDB(moment(newValue).format('HH:mm'));
                setEndTime(newValue);
              }}
              renderInput={(params) => (
                <StyledTextFiled variant="filled" {...params} />
              )}
            />
          </LocalizationProvider>
        </>
      )}
    </StyledStack>
  );
};

export default OpenHourDay;
