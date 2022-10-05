import Button from '@mui/material/Button';
import React from 'react';
import { StyledNav, StyledProgress } from './WelcomeStyles';
import styled from '@emotion/styled';

const StyledHolder = styled.div`
  background-color: white;
  z-index: 100;
`;

export const NavBar = ({
  setQuestion,
  nextStep,
  previousStep,
  totalSteps,
  step,
  allow = true,
}) => {
  const messages = [
    'Enter Pitch Details?',
    'Enter Pitch type?',
    'Enter Standard Opening hours?',
    'Enter Special Opening hours?',
    'Upload Pitch Image?',
    'Enter location?',
  ];
  return (
    <StyledHolder>
      <StyledProgress
        variant={'determinate'}
        value={(step / totalSteps) * 100}
      />
      <StyledNav>
        {step > 1 && (
          <Button
            variant={'outlined'}
            onClick={() => {
              setQuestion(messages[step - 2]);
              return previousStep();
            }}
          >
            Go Back
          </Button>
        )}
        {/*// Needed to keep the continue button on the right*/}
        {step === 1 && <div />}
        {step < totalSteps && allow && (
          <Button
            variant={'contained'}
            onClick={() => {
              setQuestion(messages[step]);
              return nextStep();
            }}
          >
            Next
          </Button>
        )}
        {step === totalSteps && allow && (
          <Button
            variant={'contained'}
            color={'success'}
            onClick={async () => {
              return await nextStep();
            }}
          >
            Create 🏟️
          </Button>
        )}
      </StyledNav>
    </StyledHolder>
  );
};
