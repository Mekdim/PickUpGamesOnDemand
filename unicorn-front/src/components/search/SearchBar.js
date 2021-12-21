import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import momentTimezone from "moment-timezone";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MobileDatePicker } from "@mui/lab";
import { makeStyles, createStyles } from "@mui/styles";
import Picker from "./Picker";
import { getPitches } from "./SearchBarLogic";
import Loader from "../Loader";
import PitchLine from "./PitchLine";
import {
  StyledPopper,
  Box,
  StyledDividerHorizontal,
  SearchField,
  SearchRow,
  ButtonBar,
  SearchButton,
  SearchIconButton,
  SearchInput,
  SearchLabelStyled,
  StyledAutocomplete,
  StyledDividerVertical,
} from "./SearchBarStyles";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& .MuiAutocomplete-listbox": {
        "& li": {
          borderRadius: "15px",
        },
        "& li:hover, li:focus": {
          borderRadius: "15px",
          backgroundColor: "#ebf8f8",
        },
      },

      "& .MuiAutocomplete-paper": {
        minHeight: "320px",
        maxHeight: "320px",
        border: "1px solid #c7c7c7",
        "border-radius": "20px",
        "margin-top": "20px",
        padding: "16px 24px 16px 24px",
        boxShadow:
          "0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)",
        transition:
          "opacity 326ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 217ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      },
    },
  })
);

const PopperMy = function (props) {
  const classes = useStyles();
  return (
    <StyledPopper
      {...props}
      className={classes.root}
      placement="bottom-start"
    />
  );
};

const SearchBar = () => {
  const { moment } = new DateAdapter({ instance: momentTimezone });
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down("sm"));
  const smallDevice = useMediaQuery("(max-width: 759px)");

  const history = useHistory();
  const [{ selectedDate, pitchSearched }, dispatch] = useStateValue();
  const [date, setDate] = useState(selectedDate ? selectedDate : null);
  const [locationSelected, setLocationSelected] = useState(
    pitchSearched ? pitchSearched : null
  );
  const [PitchLocations, setPitchLocations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
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
              name: result[i].name,
              type: result[i].type,
              address: result[i].address,
              label: result[i].description + " in " + result[i].address + " ",
              id: result[i].id,
            });
          }
          if (isMounted) {
            setPitchLocations(pitches);
          }
        } else {
          // no pitch to show so maybe alert? maybe not (just no pitch in the db yet)
          console.log("no pitch to show on the drop down");
        }
      })
      .catch((error) => {
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
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Box>
      <SearchRow>
        <SearchField>
          <SearchLabelStyled>Location</SearchLabelStyled>
          <StyledAutocomplete
            isOptionEqualToValue={(option, value) => option.id === value.id}
            PopperComponent={PopperMy}
            id="combo-box-demo"
            options={PitchLocations}
            value={locationSelected ? locationSelected : pitchSearched}
            onChange={(event, newValue) => {
              setLocationSelected(newValue);
            }}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <PitchLine name={option.name} status={option.address} />
              </li>
            )}
            renderInput={(params) => (
              <SearchInput
                variant="standard"
                placeholder="Where ?"
                {...params}
              />
            )}
          />
        </SearchField>
        <StyledDividerVertical
          orientation={"vertical"}
          variant={"middle"}
          flexItem
        />
        <StyledDividerHorizontal variant={"middle"} flexItem />
        {!small && <Picker date={date} setDate={setDate} />}
        {small && (
          <SearchField>
            <SearchLabelStyled>Date</SearchLabelStyled>
            <LocalizationProvider dateAdapter={DateAdapter}>
              {small && (
                <MobileDatePicker
                  minDate={moment(new Date().getDate(), "DD/MM/YYYY")}
                  value={date}
                  onChange={(value) => {
                    setDate(value);
                  }}
                  renderInput={(params) => {
                    params.inputProps.placeholder = "when ?";
                    return (
                      <SearchInput
                        variant="standard"
                        placeholder={"When ?"}
                        {...params}
                      />
                    );
                  }}
                />
              )}
            </LocalizationProvider>
          </SearchField>
        )}
        <StyledDividerHorizontal variant={"middle"} flexItem />
        <ButtonBar>
          {smallDevice && (
            <SearchButton
              startIcon={<SearchIcon fontSize={"large"} />}
              onClick={() =>
                getPitches({
                  date,
                  locationSelected,
                  setLoading,
                  dispatch,
                  history,
                })
              }
            >
              Search
            </SearchButton>
          )}
          {!smallDevice && (
            <SearchIconButton
              aria-label="close"
              size="large"
              onClick={() =>
                getPitches({
                  date,
                  locationSelected,
                  setLoading,
                  dispatch,
                  history,
                })
              }
            >
              <SearchIcon fontSize={"large"} />
            </SearchIconButton>
          )}
        </ButtonBar>
      </SearchRow>
      {loading && <Loader />}
    </Box>
  );
};

export default SearchBar;
