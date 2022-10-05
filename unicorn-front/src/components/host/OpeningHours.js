import React, { useState } from 'react';
import StandardHours from './StandardHours';
import {
  StyledCenterContent,
  StyledCommon,
  StyledOptionField,
  StyledOptionWrapper,
} from './WelcomeStyles';
import { StyledAnswersWrapper } from '../searchResult/SearchMap';
import { NavBar } from './NavBar';

const OpeningHours = (props) => {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <StyledCommon>
      <StyledAnswersWrapper>
        <StyledCenterContent>
          <StyledOptionWrapper>
            <StyledOptionField>
              <StandardHours {...props} />
            </StyledOptionField>
          </StyledOptionWrapper>
        </StyledCenterContent>
      </StyledAnswersWrapper>
      <NavBar step={3} {...props} />
    </StyledCommon>
  );
};

export default OpeningHours;
