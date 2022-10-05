import React, { useEffect, useState } from 'react';
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

export const PitchTypes = (props) => {
  const [value, setValue] = useState(null);
  const [selected, setSelected] = useState(null);
  const [allow, setAllow] = useState(false);

  useEffect(() => {
    props.update('type', value);
    if (value !== null) {
      setAllow(true);
    }
  }, [value, selected]);

  return (
    <StyledCommon>
      <StyledAnswersWrapper>
        <StyledCenterContent>
          <StyledOptionWrapper>
            <StyledOption
              selected={selected === 'Indoor'}
              onClick={(e) => {
                setValue('Indoor');
                setSelected('Indoor');
                //props.update('type', value);
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
                setValue('Outdoor');
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
      <NavBar step={2} allow={allow} {...props} />
    </StyledCommon>
  );
};
