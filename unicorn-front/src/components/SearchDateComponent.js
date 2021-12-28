import React, { useState, useEffect } from "react";
import "../css/SearchDateComponent.css";
import SearchIcon from "@mui/icons-material/Search";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { useStateValue } from "../StateProvider";
import TextField from "@mui/material/TextField";
import { Button, Autocomplete } from "@mui/material";
import { actionTypes } from "../reducer";
import styled from "@emotion/styled";
import { useHistory } from "react-router-dom";
import Loader from "./Loader";
import momentTimezone from "moment-timezone";

const StyledTextField = styled(TextField)`
  color: blue !important ;
`;

function SearchDateComponent() {
  const history = useHistory();
  const [
    { homeFields, selectedDate, selectedLocation, pitchSearched },
    dispatch,
  ] = useStateValue();
  const [date, setDate] = useState(selectedDate ? selectedDate : null);
  console.log(selectedDate);
  console.log(date);
  const [location, setLocation] = useState("");
  const [locationSelected, setLocationSelected] = useState(
    pitchSearched ? pitchSearched : null
  );
  const [address, setAddress] = useState("");
  const [PitchLocations, setPitchLocations] = useState([]);
  const [loading, setLoading] = useState(false);

  const [backEndUrl, setBackEndUrl] = useState(process.env.backEndUrl || "http://localhost:8080");

  const { moment } = new DateAdapter({ instance: momentTimezone });
  // search pitches based on date and location selected
  const getPitches = () => {
    if (!date) {
      alert("please select date to search");
      return;
    }

    var url = `${backEndUrl}/pitch/pitches/`;
    console.log(locationSelected);
    const formatedDate = date.format("YYYY-MM-DD");
    if (locationSelected) {
      url = `${backEndUrl}/pitch/pitches/` + locationSelected.id + "/";
    }

    const dayofweek = {
      1: "monday",
      2: "tuesday",
      3: "wednesday",
      4: "thursday",
      5: "friday",
      6: "saturday",
      7: "sunday",
    };
    setLoading(true);
    // date.isoweekeday returns 1-7 starting from monday
    fetch(url + dayofweek[date.isoWeekday()], {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
      //phone number has to be inserted properly as well on sign up
    })
      .then((response) => {
        if (!response.ok) {
          // throw the promise to catch and
          // display message from backend API
          throw response;
        } else return response.json();
      })
      .then((result) => {
        if (result.length > 0) {
          for (let i = 0; i < result.length; i++) {
            // append this value on results so we can use it on pitch card
            result[i]["dateSearched"] = formatedDate;
          }
          dispatch({
            // for now let me ignore the result here
            type: actionTypes.SET_HOME_FIELDS,
            homeFields: {
              fields: result,
            },
          });
          dispatch({
            type: actionTypes.SET_SELECTED_DATE,
            selectedDate: date,
          });
          dispatch({
            type: actionTypes.SET_PITCH_SEARCHED,
            pitchSearched: locationSelected,
          });
        } else {
          dispatch({
            // else dispatch so no field are shown
            type: actionTypes.SET_HOME_FIELDS,
            homeFields: null,
          });
          dispatch({
            type: actionTypes.SET_SELECTED_DATE,
            selectedDate: date,
          });
          dispatch({
            type: actionTypes.SET_PITCH_SEARCHED,
            pitchSearched: locationSelected,
          });
        }
        setLoading(false);
        history.push("/search_results");
      })
      .catch((error) => {
        setLoading(false);
        // error can come from rejected Promise fetch api error or from backend API
        // console.log(error.status)
        alert(
          "Sorry, Some server error happened while fetching pitches for the selected date and location!"
        );
        // if error comes from backend API - we can grab the mesage here or send it to logger in the future
        if (typeof error.json === "function") {
          error
            .json()
            .then((error) => {
              //console.log("An API error from backend API while fetching pitch options for userid XXX");
            })
            .catch((genericError) => {
              //console.log("Another error ");
            });
        } else {
          // error status undefined here
          //console.log("some sort of fetch error happended")
        }
      });
  };

  // useEffect - run on first render fetch pitch options first
  useEffect(() => {
    fetch("http://localhost:8080/pitch/pitches/", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          // throw the promise to catch and
          // display message from backend API
          throw response;
        } else return response.json();
      })
      .then((result) => {
        if (result.length > 0) {
          const pitches = [];
          for (let i = 0; i < result.length; i++) {
            pitches.push({
              label: result[i].description + " in " + result[i].address + " ",
              id: result[i].id,
            });
          }
          //pitches.push(...PitchLocations)
          setPitchLocations(pitches);
        } else {
          // no pitch to show so maybe alert? maybe not (just no pitch in the db yet)
          console.log("no pitch to show on the drop down");
        }
      })
      .catch((error) => {
        // error can come from rejected Promise fetch api error or from backend API
        // console.log(error.status)
        alert(
          "Sorry, Some server error happended while fetching pitch options. you might be unable to choose pitches"
        );
        // if error comes from backend API - we can grab the mesage here or send it to logger in the future
        if (typeof error.json === "function") {
          error
            .json()
            .then((error) => {
              //console.log("An API error from backend API while fetching pitches option for userid XXX");
            })
            .catch((genericError) => {
              //console.log("Another error ");
            });
        } else {
          // error status undefined here
          //console.log("some sort of fetch error happended")
        }
      });
  }, []);

  return (
    <div className="searchComponents">
      <div className="search">
        <div className="search__location">
          {/*<input type="text" placeholder={selectedLocation?selectedLocation:"Select Location"} onChange={(event) => {
                                setLocation(event.target.value)
                            }} value={location}   />*/}
          <Autocomplete
            isOptionEqualToValue={(option, value) => option.id === value.id}
            disablePortal
            id="combo-box-demo"
            options={PitchLocations}
            value={locationSelected ? locationSelected : pitchSearched}
            onChange={(event, newValue) => {
              setLocationSelected(newValue);
            }}
            className="search__location__textField"
            renderInput={(params) => (
              <TextField variant="standard" {...params} label="Pitches" />
            )}
          />
        </div>
        <div className="search__dateRange">
          <LocalizationProvider
            dateAdapter={DateAdapter}
            className="LocalizationProvider"
          >
            <DatePicker
              label="Date"
              minDate={moment(new Date().getDate(), "DD/MM/YYYY")}
              className="search__dateRange__textField"
              value={date ? date : selectedDate}
              onChange={(value) => {
                setDate(value);
              }}
              renderInput={(params) => (
                <TextField
                  variant="standard"
                  className="search__dateRange__textField"
                  {...params}
                />
              )}
            />
          </LocalizationProvider>
        </div>
      </div>
      <Button onClick={getPitches} style={{ color: "white" }}>
        Search
      </Button>
      {loading && <Loader />}
    </div>
  );
}

export default SearchDateComponent;
