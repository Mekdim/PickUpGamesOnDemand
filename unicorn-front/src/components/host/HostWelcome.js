import React, { useState } from 'react';
import 'animate.css';
import {
  StyledAnswers,
  StyledCenterQuestions,
  StyledMainGrid,
  StyledMainQuestion,
  StyledQuestions,
  StyledStepWizard,
} from './WelcomeStyles';
import { PitchDetails } from './PitchDetails';
import { PitchTypes } from './PitchTypes';
import { PitchLocation } from './PitchLocation';
import OpeningHours from './OpeningHours';
import OpeningHoursSpecial from './OpeningHoursSpecial';
import { PitchImage } from './PitchImage';

const HostWelcome = () => {
  const [state, setState] = useState({
    form: {},
  });

  let transitions = {
    enterRight: `animate__fadeIn`,
    enterLeft: `animate__fadeIn`,
    exitRight: `animate__fadeOut`,
    exitLeft: `animate__fadeOut`,
    intro: `animate__fadeIn`,
  };

  const [question, setQuestion] = useState('Enter Pitch Details?');

  const updateForm = (key, value) => {
    const { form } = state;

    form[key] = value;
    setState({
      ...state,
      form,
    });
  };

  return (
    <>
      <StyledMainGrid container>
        <StyledQuestions item xs={12} md={4}>
          <StyledCenterQuestions>
            <StyledMainQuestion>{question}</StyledMainQuestion>
          </StyledCenterQuestions>
        </StyledQuestions>
        <StyledAnswers item xs={12} md={8}>
          <StyledStepWizard transitions={transitions}>
            <PitchDetails update={updateForm} setQuestion={setQuestion} />
            <PitchTypes update={updateForm} setQuestion={setQuestion} />
            <OpeningHours update={updateForm} setQuestion={setQuestion} />
            <OpeningHoursSpecial
              update={updateForm}
              setQuestion={setQuestion}
            />
            <PitchImage update={updateForm} setQuestion={setQuestion} />
            <PitchLocation
              state={state}
              update={updateForm}
              setQuestion={setQuestion}
            />
          </StyledStepWizard>
        </StyledAnswers>
      </StyledMainGrid>
    </>
  );
};

export default HostWelcome;
