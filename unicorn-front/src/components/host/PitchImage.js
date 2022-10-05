import React, { useEffect, useState } from 'react';
import {
  StyledAnswersWrapper,
  StyledCenterContent,
  StyledCommon,
  StyledOptionWrapper,
} from './WelcomeStyles';
import { NavBar } from './NavBar';
import FileUpload from '../fileUpload/FileUpload';

export const PitchImage = (props) => {
  const [uploadUrl, setUploadUrl] = useState('');
  const [allow, setAllow] = useState(false);

  useEffect(() => {
    props.update('url', uploadUrl);
    if (uploadUrl !== '') {
      setAllow(true);
    }
  }, [uploadUrl]);

  return (
    <StyledCommon>
      <StyledAnswersWrapper>
        <StyledCenterContent>
          <StyledOptionWrapper>
            <FileUpload setUploadUrl={setUploadUrl} />
          </StyledOptionWrapper>
        </StyledCenterContent>
      </StyledAnswersWrapper>
      <NavBar step={5} allow={allow} {...props} />
    </StyledCommon>
  );
};
