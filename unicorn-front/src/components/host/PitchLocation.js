import React, { useEffect, useState } from 'react';
import { StyledAnswersWrapper, StyledCommon } from './WelcomeStyles';
import { NavBar } from './NavBar';
import Map from './Map';
import { createPitch } from './HostLogic';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import { Alert } from '@mui/lab';

export const PitchLocation = (props) => {
  const submit = async () => {
    try {
      setRequestLoading(true);
      let currentState = JSON.parse(JSON.stringify(props.state.form));
      currentState.hostId = Cookies.get('id');

      await createPitch(currentState);
      setRequestLoading(false);
      setIsError(false);
      history.push('/');
    } catch (e) {
      setRequestLoading(false);
      setIsError(true);
      console.error('Pitch creation failed ', e);
    }
  };
  const history = useHistory();
  const [requestLoading, setRequestLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [latitude, setLatitude] = useState(8.997924351506697);
  const [longitude, setLongitude] = useState(38.75632421923288);

  useEffect(() => {
    props.update('lat', latitude);
    props.update('lon', longitude);
  }, [longitude, latitude]);

  return (
    <StyledCommon>
      <StyledAnswersWrapper>
        <Map setLongitude={setLongitude} setLatitude={setLatitude} />
      </StyledAnswersWrapper>
      {isError && <Alert severity="error">Pitch creation failed!</Alert>}
      <NavBar step={6} {...props} nextStep={submit} />
    </StyledCommon>
  );
};
