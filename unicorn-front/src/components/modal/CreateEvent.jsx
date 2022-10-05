import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import SportsIcon from '@mui/icons-material/Sports';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Paper, Tooltip } from '@mui/material';
import styled from '@emotion/styled';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Stack from '@mui/material/Stack';
import MobileTimePicker from '@mui/lab/MobileTimePicker';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { refreshTheToken, logErrors } from '../logic/logic';
import Draggable from 'react-draggable';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import EventIcon from '@mui/icons-material/Event';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { useTranslation } from 'react-i18next';

const StyledButton = styled(LoadingButton)`
  margin: 5px;
  max-height: 40px;
  min-height: 40px;
  min-width: 100px;
`;

const StyledPaper = styled.div`
  padding: 10px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  width: 400px;
  height: 350px;
  background-color: white;
  @media only screen and (max-width: 600px) {
    width: 250px;
  }
`;

const StyledDialog = styled(Dialog)`
  .MuiPaper-root {
    font-family: 'Roboto', sans-serif;
    border-radius: 15px;
  }
`;

const StyledTextFiled = styled(TextField)`
  width: 100%;
`;

const ModalTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding-left: 34px;
`;

const CloseButton = styled.div`
  width: 40px;
  height: 40px;
  text-align: right;
`;

const StyledDialogTitle = styled(DialogTitle)`
  padding: 0;
`;

const StyledLine = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const StyledIconCentered = styled.div`
  margin-top: auto;
  margin-right: 15px;
`;

const StyledTitle = styled.p`
  //font-family: "Nova Mono", monospace;
  font-family: 'Roboto', sans-serif;
  text-align: left;
  width: 100%;
`;

const StyledBar = styled.div`
  background-color: #f1f3f4;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: 10px;
`;

const PaperComponent = (props) => {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
};

export const CreateEvent = ({
  open,
  handleClose,
  pitchId,
  eventStartTime,
  eventEndTime,
}) => {
  const { moment } = new DateAdapter();
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [date, setDate] = useState(eventStartTime);
  const [startTime, setStartTime] = useState(eventStartTime);
  const [endTime, setEndTime] = useState(eventEndTime);
  const [startTimeDB, setStartTimeDB] = useState(
    moment(eventStartTime).format('HH:mm')
  );
  const [endTimeDB, setEndTimeDB] = useState(
    moment(eventEndTime).format('HH:mm')
  );
  const [sessionName, setSessionName] = useState('');
  const [isError, setIsError] = useState(false);
  const [sessionError, setSessionError] = useState(null);

  const backEndUrl =
    process.env.REACT_APP_backEndUrl || 'http://localhost:8080';
  const playerId = Cookies.get('id');
  const { t } = useTranslation('main');

  useEffect(() => {
    let isEnabled = date && startTime && endTime && sessionName !== '';
    setIsButtonDisabled(!isEnabled);
  }, [date, startTime, endTime, sessionName]);

  const closeModal = () => {
    setSessionError(null);
    setIsError(false);
  };

  const cleanUpState = () => {
    setIsLoading(false);
    setDate(null);
    setStartTime(null);
    setStartTimeDB(null);
    setEndTime(null);
    setEndTimeDB(null);
    setSessionName('');
    setIsError(false);
    setSessionError(null);
  };

  const handleAdd = ({ refreshEnabled = true }) => {
    setIsLoading(true);
    const body = {
      pitch_id: pitchId,
      name: sessionName,
      date: date,
      start_time: startTimeDB,
      end_time: endTimeDB,
      duration: endTime - startTime,
      number_of_players: '1',
      player_id: playerId,
    };
    let bearer_token = Cookies.get('accessToken');
    if (!bearer_token) {
      history.push('/signin');
    }
    fetch(`${backEndUrl}/pitch/addSession`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + bearer_token,
      },
      body: JSON.stringify(body),
    })
      .then(async (res) => {
        // try refershing token and try again just one more time
        if (res.status === 403 && refreshEnabled) {
          let tokens = await refreshTheToken();
          if (!tokens) {
            console.log(
              'We couldnt get new tokens and refresh token for you. We are not able to create a session for you at the moment.'
            );
            setIsLoading(false);
            setIsError(true);
            return;
          }
          Cookies.set('accessToken', tokens.accessToken);
          Cookies.set('refreshToken', tokens.refreshToken);
          handleAdd({ refreshEnabled: false });
          return;
        }
        if (res.status === 406) {
          setSessionError(
            'Make sure your session times dont conflict with current calendar and game session should last between 1 hour and 2 hours '
          );
        }
        if (!res.ok) {
          throw new Error(
            'Sorry! We are not able to create a session for you at the moment. Try again later'
          );
        }
        res.json();
      })
      .then(() => {
        cleanUpState();
        handleClose();
      })
      .catch((error) => {
        if (error.statusText) {
          logErrors(
            `There was an error for user ${Cookies.get(
              'firstname'
            )} with id ${Cookies.get('id')} : ${error.statusText}`
          );
        }
        if (typeof error.toString() === 'string') {
          logErrors(
            `There was an error for user ${Cookies.get(
              'firstname'
            )} with id ${Cookies.get('id')} : ${error.toString()}`
          );
        }
        setIsLoading(false);
        setIsError(true);
      });
  };

  return (
    <StyledDialog
      onClose={handleClose}
      open={open}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <StyledDialogTitle>
        <StyledBar style={{ cursor: 'move' }} id="draggable-dialog-title">
          <Tooltip title="Close" placement={'bottom'} arrow>
            <CloseButton>
              <IconButton onClick={handleClose} aria-label="close" size="small">
                <CloseIcon fontSize={'small'} />
              </IconButton>
            </CloseButton>
          </Tooltip>
        </StyledBar>
        <ModalTitle>
          <StyledTitle>{t('addModal.title')}</StyledTitle>
        </ModalTitle>
      </StyledDialogTitle>
      <DialogContent dividers>
        <StyledPaper elevation={5}>
          <Stack component="form" spacing={3} sx={{ width: '100%' }}>
            <TextField
              variant="standard"
              fullWidth
              autoFocus
              id="outlined-required"
              label={t('addModal.name')}
              placeholder={t('addModal.placeHolder')}
              onChange={(event) => {
                setSessionName(event.target.value);
              }}
              inputProps={{ maxLength: 20 }}
              value={sessionName}
            />
            <StyledLine>
              <StyledIconCentered>
                <EventIcon fontSize={'medium'} />
              </StyledIconCentered>

              <LocalizationProvider
                dateAdapter={DateAdapter}
                className="LocalizationProvider"
              >
                <MobileDatePicker
                  label={t('addModal.date')}
                  minDate={moment(new Date().getDate(), 'DD/MM/YYYY')}
                  value={date}
                  format="DD/MM/YYYY"
                  onChange={(value) => {
                    setDate(value);
                  }}
                  renderInput={(params) => (
                    <StyledTextFiled variant="standard" {...params} />
                  )}
                />
              </LocalizationProvider>
            </StyledLine>
            <StyledLine>
              <StyledIconCentered>
                <ScheduleIcon fontSize={'medium'} />
              </StyledIconCentered>
              <LocalizationProvider
                dateAdapter={DateAdapter}
                className="LocalizationProvider"
              >
                <MobileTimePicker
                  label={t('addModal.startTime')}
                  value={startTime}
                  minutesStep={15}
                  onChange={(newValue) => {
                    setStartTimeDB(moment(newValue).format('HH:mm'));
                    setStartTime(newValue);
                  }}
                  renderInput={(params) => (
                    <StyledTextFiled variant="standard" {...params} />
                  )}
                />
              </LocalizationProvider>
            </StyledLine>
            <StyledLine>
              <StyledIconCentered>
                <ScheduleIcon fontSize={'medium'} />
              </StyledIconCentered>
              <LocalizationProvider
                dateAdapter={DateAdapter}
                className="LocalizationProvider"
              >
                <MobileTimePicker
                  label={t('addModal.endTime')}
                  minTime={startTime}
                  value={endTime}
                  minutesStep={15}
                  onChange={(newValue) => {
                    setEndTimeDB(moment(newValue).format('HH:mm'));
                    setEndTime(newValue);
                  }}
                  renderInput={(params) => (
                    <StyledTextFiled variant="standard" {...params} />
                  )}
                />
              </LocalizationProvider>
            </StyledLine>
            {isError && (
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={closeModal}
                message={sessionError ? sessionError : 'Error Occured!'}
              />
            )}
          </Stack>
        </StyledPaper>
      </DialogContent>
      <DialogActions>
        <Box sx={{ m: 1, position: 'relative' }}>
          <StyledButton
            size="small"
            variant="contained"
            color={'success'}
            disabled={isButtonDisabled}
            loading={isLoading}
            loadingIndicator={t('addModal.creating')}
            onClick={handleAdd}
            endIcon={<SportsIcon />}
          >
            {t('addModal.create')}
          </StyledButton>
          {isLoading && (
            <CircularProgress
              size={24}
              sx={{
                color: 'green',
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
          )}
        </Box>
      </DialogActions>
    </StyledDialog>
  );
};
