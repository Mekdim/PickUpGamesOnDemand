import React, { useContext, useEffect, useState } from 'react';
import { StyledAnswersWrapper, StyledCommon } from './WelcomeStyles';
import Map from './Map';
import { NavBar } from './NavBar';
import { PitchDataContext } from '../../../context/PitchDataContext';
import { updatePitchData } from './HostLogic';

export const PitchLocationV2 = () => {
  const { pitch } = useContext(PitchDataContext);
  let lat = pitch.latitude || 8.997924351506697;
  let lang = pitch.longitude || 38.75632421923288;

  const [latitude, setLatitude] = useState(lat);
  const [longitude, setLongitude] = useState(lang);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const save = async () => {
    const details = {
      latitude: latitude,
      longitude: longitude,
    };
    setIsLoading(true);
    try {
      await updatePitchData(details, pitch.id, 'pitch/updateLocation');
      setIsError(false);
      setIsSuccess(true);
      setIsLoading(false);
    } catch (e) {
      console.log('Unable to update pitch location', e);
      setIsError(true);
      setIsSuccess(false);
      setIsLoading(false);
    }
  };

  return (
    <StyledCommon>
      <StyledAnswersWrapper>
        <Map
          setLongitude={setLongitude}
          setLatitude={setLatitude}
          initialLat={lat}
          initialLong={lang}
        />
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
