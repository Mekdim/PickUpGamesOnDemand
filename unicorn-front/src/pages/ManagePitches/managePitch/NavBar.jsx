import React from 'react';
import { StyledNav } from './WelcomeStyles';
import styled from '@emotion/styled';
import { Alert, Snackbar } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

const StyledButton = styled(LoadingButton)`
  min-width: 140px;
  min-height: 40px;
`;

export const NavBar = ({
  nextStep,
  isError = false,
  isSuccess = false,
  isLoading = false,
}) => {
  return (
    <>
      <StyledNav>
        {isError && (
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={true}
            autoHideDuration={6000}
          >
            <Alert severity={'error'}>
              Sorry :( We have a problem updating your Pitch. Try again later.
            </Alert>
          </Snackbar>
        )}
        {isSuccess && (
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={true}
            autoHideDuration={6000}
          >
            <Alert severity="success" sx={{ width: '100%' }}>
              Successfully updated!
            </Alert>
          </Snackbar>
        )}
        <StyledButton
          variant={'contained'}
          color={'success'}
          loading={isLoading}
          onClick={async () => {
            return nextStep();
          }}
        >
          save
        </StyledButton>
      </StyledNav>
    </>
  );
};
