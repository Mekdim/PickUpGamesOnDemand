import React, { useContext, useEffect, useState } from 'react';
import {
  StyledAnswersWrapper,
  StyledCenterContent,
  StyledCommon,
  StyledOptionWrapper,
} from './WelcomeStyles';
import FileUpload from '../../../components/fileUpload/FileUpload';
import { NavBar } from './NavBar';
import { updatePitchData } from './HostLogic';
import { PitchDataContext } from '../../../context/PitchDataContext';

export const PitchImageV2 = () => {
  const [uploadUrl, setUploadUrl] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { pitch } = useContext(PitchDataContext);

  const save = async () => {
    if (uploadUrl !== '') {
      const details = {
        url: uploadUrl,
      };
      setIsLoading(true);
      try {
        await updatePitchData(details, pitch.id, 'pitch/updateUrl');
        setIsError(false);
        setIsSuccess(true);
        setIsLoading(false);
      } catch (e) {
        console.error('Unable to update pitch details', e);
        setIsError(true);
        setIsSuccess(false);
        setIsLoading(false);
      }
    }
  };

  return (
    <StyledCommon>
      <StyledAnswersWrapper>
        <StyledCenterContent>
          <StyledOptionWrapper>
            <FileUpload setUploadUrl={setUploadUrl} />
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
