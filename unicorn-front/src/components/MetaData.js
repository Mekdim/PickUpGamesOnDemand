import React from 'react';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('main');
  return (
    <StyledField>
      <Typography>{t(`pitchCard.${fieldName}`)}</Typography>
      <Typography> {fieldValue}</Typography>
    </StyledField>
  );
};

export default Metadata;
