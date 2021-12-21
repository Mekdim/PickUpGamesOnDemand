import React from "react";
import styled from "@emotion/styled";
import Divider from "@mui/material/Divider";

const StyledCurrentTimeDivider = styled(Divider)`
  border-top: 2px solid;
  z-index: 50;
  position: absolute;
  border-color: red;
  width: 100%;
  top: ${(props) => {
    return props.top ? props.top : 0;
  }}px;
  ::after,
  ::before {
    border-top: 2px solid red;
  }
`;

const StyledCircle = styled.div`
  background: red;
  z-index: 50;
  position: absolute;
  height: 12px;
  width: 12px;
  margin-left: 61px;
  top: ${(props) => {
    return props.top ? props.top : 0;
  }}px;
  border-radius: 50%;
`;

const StyledCurrentTime = styled.p`
  z-index: 50;
  position: absolute;
  height: 12px;
  width: 60px;
  color: #ef3131;
  font-weight: 200;
  font-size: 11px;
  margin-left: 3px;
  margin-block-start: 0;
  margin-block-end: 0;
  top: ${(props) => {
    return props.top ? props.top : 0;
  }}px;
`;

const CurrentTimeIndicator = ({ height, id }) => {
  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const timeAMPM = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  let hours = Number(time.slice(0, 2)) * 60;
  let minutes = Number(time.slice(3));

  /**   total height minus the margin/padding to the top line and the bottom line
     of the 0AM hour and 12PM hour
     then divided by the number of minutes in a day*/
  let topShift = (height - 12) * ((hours + minutes) / 1440);

  return (
    <>
      <StyledCurrentTime id={id} top={topShift}>
        {timeAMPM}
      </StyledCurrentTime>
      <StyledCircle top={topShift} />
      <StyledCurrentTimeDivider top={topShift + 4} variant={"inset"} />
    </>
  );
};

export default CurrentTimeIndicator;
