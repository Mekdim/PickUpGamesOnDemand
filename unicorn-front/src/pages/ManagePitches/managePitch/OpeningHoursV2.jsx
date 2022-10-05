import React, { useContext, useState } from 'react';
import StandardHours from './StandardHours';
import {
  StyledCenterContent,
  StyledCommon,
  StyledOptionField,
  StyledOptionWrapperHours,
} from './WelcomeStyles';
import { StyledAnswersWrapper } from '../../../components/searchResult/SearchMap';
import { NavBar } from './NavBar';
import { createHours, updatePitchData } from './HostLogic';
import { PitchDataContext } from '../../../context/PitchDataContext';

export const OpeningHoursV2 = () => {
  const { pitch } = useContext(PitchDataContext);
  const [state, setState] = useState({
    form: {},
  });
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const updateForm = (key, value) => {
    const { form } = state;

    form[key] = value;
    setState({
      ...state,
      form,
    });
  };

  const save = async () => {
    const hours = createHours(state.form);
    setIsLoading(true);
    try {
      await updatePitchData({ hours: hours }, pitch.id, 'pitch/updateHours');
      setIsError(false);
      setIsSuccess(true);
      setIsLoading(false);
    } catch (e) {
      console.error('Unable to update pitch details', e);
      setIsError(true);
      setIsSuccess(false);
      setIsLoading(false);
    }
  };

  return (
    <StyledCommon>
      <StyledAnswersWrapper>
        <StyledCenterContent>
          <StyledOptionWrapperHours>
            <StyledOptionField>
              <StandardHours update={updateForm} />
            </StyledOptionField>
          </StyledOptionWrapperHours>
        </StyledCenterContent>
      </StyledAnswersWrapper>
      <NavBar
        nextStep={save}
        isError={isError}
        isSuccess={isSuccess}
        isLoading={isLoading}
      />
    </StyledCommon>
  );
};
