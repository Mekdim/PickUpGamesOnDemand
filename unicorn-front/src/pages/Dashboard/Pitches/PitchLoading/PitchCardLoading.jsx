import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import SaveIcon from '@mui/icons-material/Save';
import Card from '@mui/material/Card';
import LoadingButton from '@mui/lab/LoadingButton';
import styled from '@emotion/styled';

const StyledLoadingButton = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
`;

export const PitchCardLoading = () => {
  return (
    <Card>
      <Skeleton variant="rectangular" animation={'wave'} height={200} />
      <StyledLoadingButton>
        <LoadingButton
          loading
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="outlined"
        >
          Edit
        </LoadingButton>
      </StyledLoadingButton>
    </Card>
  );
};

export default PitchCardLoading;
