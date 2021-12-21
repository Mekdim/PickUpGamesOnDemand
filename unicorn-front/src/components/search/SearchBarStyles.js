import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";
import { Autocomplete, Divider, IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import Popper from "@mui/material/Popper";

export const SearchLabelStyled = styled.p`
  text-align: left;
  margin: 0 0 -3px 20px;
  font-size: 12px !important;
  line-height: 16px !important;
  font-weight: 800 !important;
  letter-spacing: 0.04em !important;
  color: black;
`;

export const SearchInput = styled(TextField)`
  margin-left: 20px;
  //width: 100%;

  .MuiInput-root:before {
    border-bottom: none;
  }

  .MuiInput-root:after {
    border-bottom: none;
  }

  .MuiInput-root:hover:not(.Mui-disabled):before {
    border-bottom: none;
  }
  .MuiAutocomplete-popupIndicator {
    display: none;
  }

  .MuiAutocomplete-clearIndicator {
    margin-right: 20px;
    background-color: #ff8585;
  }

  //.MuiInputAdornment-root,
  //.MuiAutocomplete-endAdornment {
  //  display: none;
  //}

  .MuiAutocomplete-popper {
    border-radius: 20px !important;
    margin-top: 17px !important;
  }

  @media screen and (max-width: 759px) {
    width: 90%;
  }
`;

export const SearchRow = styled.div`
  display: flex;
  border-radius: 40px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  min-height: 64px;

  @media screen and (max-width: 759px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: stretch;
    padding: 16px 8px;
    border: none;
  }
`;

export const StyledDividerHorizontal = styled(Divider)`
  display: none;

  @media screen and (max-width: 759px) {
    display: block;
  }
`;

export const StyledDividerVertical = styled(Divider)`
  margin-top: 15px;
  margin-bottom: 15px;
  display: block;

  @media screen and (max-width: 759px) {
    display: none;
  }
`;

export const SearchField = styled.div`
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

export const SearchButton = styled(Button)`
  border-radius: 40px;
  color: white;
  width: 100%;
  min-height: 60px;
  min-width: 200px !important;
  background-size: 200% 200% !important;
  background-image: radial-gradient(
    circle at center center,
    rgb(255, 56, 92) 0%,
    rgb(230, 30, 77) 27.5%,
    rgb(227, 28, 95) 40%,
    rgb(215, 4, 102) 57.5%,
    rgb(189, 30, 89) 75%,
    rgb(189, 30, 89) 100%
  ) !important;
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
  }
`;

export const SearchIconButton = styled(IconButton)`
  //background-color: #ff8585;
  background: linear-gradient(
    to right,
    #e61e4d 0%,
    #e31c5f 50%,
    #d70466 100%
  ) !important;
  color: white;
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
    -webkit-box-shadow: 0px 4px 4px 0px rgb(48 51 53 / 85%),
      0px 8px 12px 6px rgb(60 64 67 / 39%);
    box-shadow: 0px 4px 4px 0px rgb(48 51 53 / 85%),
      0px 8px 12px 6px rgb(60 64 67 / 39%);
  }
`;

export const StyledAutocomplete = styled(Autocomplete)`
  width: 300px;
  @media screen and (max-width: 759px) {
    width: 100%;
  }
`;

export const ButtonBar = styled.div`
  @media screen and (max-width: 759px) {
    margin-top: 10px;
    width: 100%;
  }
`;

export const Box = styled.div`
  background-color: white;
  border-radius: 40px;
  //border: 2px solid black;
  //width: 100%;

  //@media screen and (max-width: 759px) {
  //  padding: 16px 8px;
  //  //width: 100%;
  //}
`;

export const StyledPopper = styled(Popper)`
  width: 400px !important;
  @media screen and (max-width: 759px) {
    width: 100%;
  }
`;
