import React from "react";
import styled from "@emotion/styled";
import floodLight from "../../img/floodlight.jpg";

const StyledImage = styled.div`
  min-height: 25rem;
  max-height: 60rem;
  height: 72vh;
  overflow: hidden;
  position: absolute;
  top: 61px;
  width: 100%;
  z-index: -2;
  background-image: url(${floodLight});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  @media screen and (max-width: 759px) {
    height: 30rem;
    margin-bottom: -30rem;
  }
`;

const StyledBlur = styled.div`
  min-height: 25rem;
  max-height: 60rem;
  height: 72vh;
  overflow: hidden;
  position: absolute;
  top: 61px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(6px);
  width: 100%;
  z-index: -1;
`;

const Blur = () => {
  return (
    <>
      <StyledImage />
      <StyledBlur />
    </>
  );
};

export default Blur;
