import React, { useEffect, useState } from 'react';
import {
  Button,
  Divider,
  FormControlLabel,
  FormGroup,
  Stack,
  Switch,
  Tooltip,
} from '@mui/material';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterMoment';
import MobileTimePicker from '@mui/lab/MobileTimePicker';
import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';
import { MobileDatePicker } from '@mui/lab';
import IconButton from '@mui/material/IconButton';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const CloseButton = styled.div`
  width: 70px;
  height: 70px;
  text-align: right;
  margin-top: auto;
  margin-bottom: auto;
`;

const CloseButtonStyled = styled(Button)`
  width: 50%;
  margin-top: 8px !important;
`;

export const SearchInput = styled(TextField)`
  width: 100%;
  min-width: 200px;

  .MuiInput-root:before {
    border-bottom: none;
  }

  .MuiInput-root:after {
    border-bottom: none;
  }

  .MuiInput-root:hover:not(.Mui-disabled):before {
    border-bottom: none;
  }
`;

const StyledTextFiled = styled(TextField)`
  width: 100%;
  min-width: 200px;
`;

const StyledGroup = styled(FormGroup)`
  margin-bottom: auto !important;
  margin-top: auto !important;
  min-width: 114px !important;
  //min-height: 56px;
  width: 100%;

  .MuiFormControlLabel-root {
    margin-left: 0;
  }
`;

const StyledDivider = styled(Divider)`
  width: 12px;
  margin: auto 8px auto 8px !important;
  background-color: #575757;

  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

const StyledDayOfWeek = styled.div`
  //min-width: 200px;
  width: 100%;
`;

const StyledTimePicker = styled(MobileTimePicker)`
  min-width: 200px;

  @media only screen and (max-width: 600px) {
    .MuiStack-root {
      margin: 0 !important;
    }
  }
`;

const StyledLocalization = styled(LocalizationProvider)`
  @media only screen and (max-width: 600px) {
    .MuiStack-root {
      margin: 0 !important;
    }
  }
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

const SpecialHour = ({ setDays, days, index, update }) => {
  const { moment } = new DateAdapter();
  const [startTime, setStartTime] = useState(
    // new Date('2018-01-01T08:00:00.000Z')
    null
  );
  const [date, setDate] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [startTimeDB, setStartTimeDB] = useState(null);
  const [endTimeDB, setEndTimeDB] = useState(null);
  const [enabled, setEnabled] = useState(true);
  const [endTimeDisabled, setEndTimeDisabled] = useState(true);

  const theme = useTheme();
  const smallest = useMediaQuery(theme.breakpoints.down('sm'));
  const small = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  useEffect(() => {
    if (date) {
      let formattedDate = moment(date).format('DD-MM-YYYY');
      let line = {
        date: formattedDate,
      };
      line.enabled = enabled;
      if (enabled) {
        line.startTime = startTimeDB;
        line.endTime = endTimeDB;
      } else {
        line.startTime = null;
        line.endTime = null;
      }
      update(`special.${formattedDate}`, line);
    }
  }, [date, startTime, endTime, enabled]);

  return (
    <StyledStack direction="row">
      <StyledDayOfWeek>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <MobileDatePicker
            minDate={moment(new Date().getDate(), 'DD/MM/YYYY')}
            value={date}
            onChange={(value) => {
              setDate(value);
            }}
            renderInput={(params) => {
              // params.inputProps.placeholder = 'when ?';
              return (
                <SearchInput
                  variant="filled"
                  placeholder={'When ?'}
                  {...params}
                />
              );
            }}
          />
        </LocalizationProvider>
      </StyledDayOfWeek>
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
          <StyledLocalization
            dateAdapter={DateAdapter}
            className="LocalizationProvider"
          >
            <StyledTimePicker
              label="Opening Time"
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
          </StyledLocalization>
          <StyledDivider flexItem orientation={'horizontal'} />
          <LocalizationProvider
            dateAdapter={DateAdapter}
            className="LocalizationProvider"
          >
            <StyledTimePicker
              label="Closing Time"
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
      <Tooltip title="Delete" placement={'bottom'} arrow>
        {small || smallest ? (
          <CloseButtonStyled
            variant={'outlined'}
            color={'error'}
            onClick={(e) => {
              e.stopPropagation();
              days.splice(index, 1);
              setDays([...days]);
              let formattedDate = moment(date).format('DD-MM-YYYY');
              update(`${formattedDate}`, {});
            }}
            aria-label="close"
            size="large"
          >
            Remove
          </CloseButtonStyled>
        ) : (
          <CloseButton>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                days.splice(index, 1);
                setDays([...days]);
                let formattedDate = moment(date).format('DD-MM-YYYY');
                update(`${formattedDate}`, {});
              }}
              aria-label="close"
              size="large"
            >
              <DeleteForeverOutlinedIcon fontSize={'large'} color={'error'} />
            </IconButton>
          </CloseButton>
        )}
      </Tooltip>
    </StyledStack>
  );
};

export default SpecialHour;
