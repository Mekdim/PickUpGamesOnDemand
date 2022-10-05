import styled from '@emotion/styled';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';

export const ThumbsStyled = styled.aside`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 16px;
  justify-content: center;
`;

export const ThumbStyled = styled.div`
  display: inline-flex;
  justify-content: space-around;
  border-radius: 2px;
  border: 1px solid #eaeaea;
  margin-bottom: 8px;
  margin-right: 8px;
  width: 100px;
  height: 100px;
  padding: 4px;
  box-sizing: border-box;
`;

export const ThumbInnerStyled = styled.div`
  display: flex;
  min-width: 0;
  overflow: hidden;
`;

export const ImageStyled = styled.img`
  display: block;
  width: auto;
  height: 100%;
`;

export const StyledPaper = styled(Paper)`
  padding: 12px;
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

export const StyledAlert = styled(Alert)`
  margin-top: 16px;
`;

export const StyledContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 350px;
  padding: 20px;
  border-width: 2px;
  border-radius: 8px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #d6e4f3;
  color: #281d2e;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

const getColor = (props) => {
  if (props.isDragAccept) {
    return '#01c569';
  }
  if (props.isDragReject) {
    return '#ff1744';
  }
  if (props.isFocused) {
    return '#2196f3';
  }
  return '#0000005c';
};
