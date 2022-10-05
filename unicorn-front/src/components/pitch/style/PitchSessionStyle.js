import styled from '@emotion/styled';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

export const StyledPrevButton = styled(IconButton)`
  :hover {
    border-radius: 15px 0 0 0;
  }
  height: 100%;
  margin-right: 23px;
  border-radius: 15px 0 0 0;
  border: 1px solid #d4d4d4;
  border-right: 0 !important;
  border-bottom: 0 !important;
`;

export const StyledNextButton = styled(IconButton)`
  :hover {
    border-radius: 0 15px 0 0;
  }
  height: 100%;
  z-index: 10;
  background-color: white;
  border-radius: 0 15px 0 0;
  border: 1px solid #d4d4d4;
  border-left: 0 !important;
  border-bottom: 0 !important;
`;

export const StyledAddIcon = styled(AddCircleIcon)`
  width: 1.5em;
  height: 1.5em;
`;

export const StyledIconButton = styled(IconButton)`
  width: 60px;
  height: 60px;
`;

export const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const GridStyled = styled(Grid)`
  align-items: stretch;
  height: 100%;
  margin-top: 8px;
`;

export const GridStyledItemInfo = styled(Grid)`
  padding-bottom: 16px;
  padding-right: 8px;
`;

export const GridStyledItemCalendar = styled(Grid)`
  padding-bottom: 16px;
  padding-left: 16px !important;
  padding-right: 16px;
`;

export const StyledCenter = styled.div`
  display: grid;
  height: 100%;
  //background-color: #b9fdb2;
  background-color: white;
  position: relative;
`;
export const StyledDiv = styled.div`
  background-color: whitesmoke;
  //margin-top: auto;
  margin-bottom: auto;
  width: 100%;
`;

export const StyledCal = styled(Paper)`
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

export const StyledTitle = styled.h2`
  font-family: 'Ubuntu', sans-serif;
  margin-block-start: 0;
  margin-block-end: 0;
`;

export const StyledButton = styled.div`
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

export const StyledEvent = styled.div`
  position: absolute;
  top: ${(props) => {
    return props.top ? props.top : 0;
  }}px;
  left: -2px;
  width: 99%;
  z-index: 1;
`;
