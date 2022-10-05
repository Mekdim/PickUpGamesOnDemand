import React, { useCallback, useContext, useState } from 'react';
import {
  StyledAnswersWrapper,
  StyledCenterContent,
  StyledCommon,
  StyledOption,
  StyledOptionIcon,
  StyledOptionIconOutdoor,
  StyledOptionIconWrapper,
  StyledOptionName,
  StyledOptionWrapper,
} from './WelcomeStyles';
import { NavBar } from './NavBar';
import { PitchDataContext } from '../../../context/PitchDataContext';
import { updatePitchData } from './HostLogic';

export const PitchTypesV2 = () => {
  const { pitch } = useContext(PitchDataContext);
  const [selected, setSelected] = useState(pitch.type);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const save = async () => {
    setIsLoading(true);
    try {
      await updatePitchData({ type: selected }, pitch.id, 'pitch/updateType');
      setIsError(false);
      setIsSuccess(true);
      setIsLoading(false);
    } catch (e) {
      setIsError(true);
      setIsSuccess(false);
      setIsLoading(false);
    }
  };

  return (
    <StyledCommon>
      <StyledAnswersWrapper>
        <StyledCenterContent>
          <StyledOptionWrapper>
            <StyledOption
              selected={selected === 'Indoor'}
              onClick={(e) => {
                setSelected('Indoor');
              }}
            >
              <StyledOptionName>Indoor</StyledOptionName>
              <StyledOptionIconWrapper>
                <StyledOptionIcon />
              </StyledOptionIconWrapper>
            </StyledOption>
          </StyledOptionWrapper>
          <StyledOptionWrapper>
            <StyledOption
              selected={selected === 'Outdoor'}
              onClick={(e) => {
                setSelected('Outdoor');
              }}
            >
              <StyledOptionName>Outdoor</StyledOptionName>
              <StyledOptionIconWrapper>
                <StyledOptionIconOutdoor />
              </StyledOptionIconWrapper>
            </StyledOption>
          </StyledOptionWrapper>
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
