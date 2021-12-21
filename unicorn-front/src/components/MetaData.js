import React from "react";
import styled from "@emotion/styled";
import { Divider, Typography } from "@mui/material";

const StyledField = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 4px;
  padding-right: 4px;
  width: 100%;
`;

const Metadata = ({ fieldName, fieldValue }) => {
  return (
    <StyledField>
      <Typography>{fieldName}</Typography>
      <Typography> {fieldValue}</Typography>
    </StyledField>
  );
};

export default Metadata;
