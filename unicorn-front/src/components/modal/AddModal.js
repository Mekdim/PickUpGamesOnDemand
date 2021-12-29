import React, { useContext, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import SportsIcon from "@mui/icons-material/Sports";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import styled from "@emotion/styled";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import DateAdapter from "@mui/lab/AdapterMoment";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Stack from "@mui/material/Stack";
import MobileTimePicker from "@mui/lab/MobileTimePicker";
import Snackbar from "@mui/material/Snackbar";
import momentTimezone from "moment-timezone";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useHistory } from "react-router-dom";
import { convertDate, fetchEvents } from "../pitch/pitchHelper";
import { addDay } from "../../utils/utils";
import { PitchContext } from "../pitch/PitchContext";
import Cookies from "js-cookie";
import { refreshTheToken } from "../logic/logic";
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
    font-family: "Roboto", sans-serif;
    border-radius: 15px;
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
  padding: 10px;
`;

const StyledTitle = styled.p`
  //font-family: "Nova Mono", monospace;
  font-family: "Roboto", sans-serif;
  text-align: left;
  width: 100%;
`;

const updateCalendar = async ({
  nextDate,
  pitchId,
  setCurrentDate,
  setNextDate,
  setEvents,
}) => {
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
  setEvents(nextDayEvents);
};

const AddModal = ({ open, handleClose, pitchId }) => {
  const { moment } = new DateAdapter({ instance: momentTimezone });
  const history = useHistory();
  const { setEvents, setNextDate, setCurrentDate } = useContext(PitchContext);
  moment().tz("Europe/London");

  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [startTimeDB, setStartTimeDB] = useState(null);
  const [endTimeDB, setEndTimeDB] = useState(null);
  const [endTimeDisabled, setEndTimeDisabled] = useState(true);
  const [sessionName, setSessionName] = useState("");
  const [isError, setIsError] = useState(false);
  const [backEndUrl, setBackEndUrl] = React.useState(process.env.REACT_APP_backEndUrl || "http://localhost:8080");
  const playerId = Cookies.get("id");
  
  const cleanUpState = () => {
    setIsLoading(false);
    setDate(new Date());
    setStartTime(null);
    setStartTimeDB(null);
    setEndTime(null);
    setEndTimeDB(null);
    setEndTimeDisabled(true);
    setSessionName("");
    setIsError(false);
  };
  const handleAdd = ({refreshEnabled=true}) => {
    setIsLoading(true);
    const body = {
      pitch_id: pitchId,
      name: sessionName,
      date: date,
      start_time: startTimeDB,
      end_time: endTimeDB,
      duration: endTime - startTime,
      number_of_players: "1",
      player_id: playerId,
    };
    let bearer_token = Cookies.get('accessToken')
       if (!bearer_token){
          alert(" we couldnt get your stored sessionin  data . Please try logging in again ")
       }
    fetch(`${backEndUrl}/pitch/addSession`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization":  'Bearer ' + bearer_token
      },
      body: JSON.stringify(body),
    })
      .then(async (res) => {
        // try refershing token and try again just one more time
        if (res.status == 403 && refreshEnabled) {

          //  return "Token expired error"
          let tokens = await refreshTheToken()
            if (!tokens){
              console.log("We couldnt get new tokens and refresh token for you. We are not able to create a session for you at the moment.")
              setIsLoading(false);
              setIsError(true);
              return
              //alert("We couldnt get new tokens and refresh token for you. Sorry")
            }
            Cookies.set('accessToken', tokens.accessToken)
            Cookies.set('refreshToken', tokens.refreshToken)
            handleAdd({refreshEnabled: false})
            return

        }
         if (!res.ok) {
          throw new Error(
            "Sorry! We are not able to create a session for you at the moment. Try again later"
          );
        }
        res.json();
        return updateCalendar({
          nextDate: date,
          pitchId,
          setCurrentDate,
          setNextDate,
          setEvents,
        });
      })
      .then(() => {
        history.push(`/pitch/${pitchId}/${convertDate(new Date(date))}`);
        cleanUpState();
        handleClose();
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  };

  return (
    <StyledDialog onClose={handleClose} open={open}>
      <StyledDialogTitle>
        <ModalTitle>
          <StyledTitle> Create a session </StyledTitle>
          <CloseButton>
            <IconButton onClick={handleClose} aria-label="close" size="middle">
              <CloseIcon fontSize={"middle"} />
            </IconButton>
          </CloseButton>
        </ModalTitle>
      </StyledDialogTitle>
      <DialogContent dividers>
        <StyledPaper elevation={5}>
          <Stack component="form" spacing={3} sx={{ width: "100%" }}>
            <TextField
              required
              fullWidth
              id="outlined-required"
              label="Session name"
              placeholder={"eg. Morning session"}
              helperText="Give us some nice name"
              onChange={(event) => {
                setSessionName(event.target.value);
              }}
              inputProps={{ maxLength: 20 }}
              value={sessionName}
            />
            <LocalizationProvider
              dateAdapter={DateAdapter}
              className="LocalizationProvider"
            >
              <DatePicker
                label="Date"
                minDate={moment(new Date().getDate(), "DD/MM/YYYY")}
                value={date}
                onChange={(value) => {
                  setDate(value);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <LocalizationProvider
              dateAdapter={DateAdapter}
              className="LocalizationProvider"
            >
              <MobileTimePicker
                label="Start Time"
                value={startTime}
                minutesStep={15}
                onChange={(newValue) => {
                  setStartTimeDB(moment(newValue).format("HH:mm"));
                  setStartTime(newValue);
                  setEndTimeDisabled(false);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <LocalizationProvider
              dateAdapter={DateAdapter}
              className="LocalizationProvider"
            >
              <MobileTimePicker
                label="End Time"
                disabled={endTimeDisabled}
                minTime={startTime}
                value={endTime}
                minutesStep={15}
                onChange={(newValue) => {
                  setEndTimeDB(moment(newValue).format("HH:mm"));
                  setEndTime(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            {isError && (
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Error Occurred"
              />
            )}
          </Stack>
        </StyledPaper>
      </DialogContent>
      <DialogActions>
        <Box sx={{ m: 1, position: "relative" }}>
          <StyledButton
            size="small"
            variant="contained"
            color={"success"}
            loading={isLoading}
            loadingIndicator="Creating..."
            onClick={handleAdd}
            endIcon={<SportsIcon />}
          >
            Create!
          </StyledButton>
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

export default AddModal;
