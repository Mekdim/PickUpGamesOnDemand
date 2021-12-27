import * as React from "react";
import Popover from "@mui/material/Popover";
import DateAdapter from "@mui/lab/AdapterMoment";
import { CalendarPicker } from "@mui/lab";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";
import momentTimezone from "moment-timezone";

const SearchField = styled.div`
  display: flex;
  border-radius: 40px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  border: 2px solid white;
  padding-top: 9.5px;
  padding-bottom: 9.5px;

  :focus,
  :hover {
    background-color: #ebebeb;
    border: 2px solid #ebebeb;
  }

  :active {
    //background-color: #f85858;
    background-color: #ebebeb;
    transition: border 280ms cubic-bezier(0.4, 0, 0.2, 1),
      box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
    -webkit-box-shadow: 0px 4px 4px 0px rgb(60 64 67 / 30%),
      0px 8px 12px 6px rgb(60 64 67 / 15%);
    box-shadow: 0px 4px 4px 0px rgb(60 64 67 / 30%),
      0px 8px 12px 6px rgb(60 64 67 / 15%);
  }
  @media screen and (max-width: 759px) {
    width: 100%;
  }
`;

const SearchInput = styled(TextField)`
  margin-left: 20px;
  //width: inherit;

  .MuiInput-root:before {
    border-bottom: none;
  }

  .MuiInput-root:after {
    border-bottom: none;
  }

  .MuiInput-root:hover:not(.Mui-disabled):before {
    border-bottom: none;
  }

  .MuiInputAdornment-root,
  .MuiAutocomplete-endAdornment {
    display: none;
  }

  .MuiAutocomplete-popper {
    border-radius: 20px !important;
    margin-top: 17px !important;
  }

  @media screen and (max-width: 759px) {
    width: 90%;
  }
`;

const SearchLabelStyled = styled.p`
  text-align: left;
  margin: 0 0 -3px 20px;
  font-size: 12px !important;
  line-height: 16px !important;
  font-weight: 800 !important;
  letter-spacing: 0.04em !important;
  color: black;
`;

const StyledPopover = styled(Popover)`
  .MuiPaper-root {
    margin-top: 20px;
    margin-left: 75px;
    border-radius: 20px;
    border: 1px solid #c7c7c7;
  }
`;

const StyledPickerWrapper = styled.div`
  width: 225px;
  @media screen and (max-width: 759px) {
    width: 100%;
  }
`;

export default function Picker({ date, setDate }) {
  const { moment } = new DateAdapter({ instance: momentTimezone });
  const [anchorEl, setAnchorEl] = React.useState(null);
  //const [date, setDate] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <StyledPickerWrapper>
      <SearchField>
        <SearchLabelStyled>Date</SearchLabelStyled>
        <SearchInput
          variant="standard"
          value={date ? new Date(date).toDateString() : ""}
          placeholder="When ?"
          onClick={handleClick}
        />
      </SearchField>
      <StyledPopover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <LocalizationProvider dateAdapter={DateAdapter}>
          <CalendarPicker
            minDate={moment(new Date().getDate(), "DD/MM/YYYY")}
            date={date}
            onChange={(newDate) => {
              setDate(newDate);
              handleClose();
            }}
          />
        </LocalizationProvider>
      </StyledPopover>
    </StyledPickerWrapper>
  );
}
