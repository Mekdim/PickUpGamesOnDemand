import React, { useState } from 'react';
import HeaderWrapped from '../HeaderWrapped';
import { makeStyles } from '@mui/styles';
import Container from '@mui/material/Container';
import { Switch, Route, useParams } from 'react-router-dom';

import { MiniDrawer } from './Drawer/MiniDrawer';
import { PitchDetailsV2 } from './managePitch/PitchDetailsV2';
import { PitchTypesV2 } from './managePitch/PitchTypesV2';
import { OpeningHoursV2 } from './managePitch/OpeningHoursV2';
import { PitchImageV2 } from './managePitch/PitchImageV2';
import { PitchLocationV2 } from './managePitch/PitchLocationV2';
import { PitchDataContext } from '../../context/PitchDataContext';
import usePitchInfo from '../../hooks/usePitchInfo';
import { FullPageLoading } from '../../components/loading/FullPageLoading';
import { Alert } from '@mui/material';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'start',
    height: '100vh',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  main: {
    width: '100vw',
    paddingLeft: '1rem',
    paddingTop: '1rem',
    paddingBottom: '1rem',
    overflow: 'scroll',
    backgroundColor: '#E5E7ED',
  },
});

export const PitchEditor = () => {
  const { id } = useParams();
  const classes = useStyles();

  const { pitch, isError, isLoading } = usePitchInfo(id);

  if (isLoading) {
    return <FullPageLoading />;
  }

  if (isError) {
    return (
      <Alert variant={'outlined'} severity={'error'}>
        Sorry :( You are not able to edit your pitch at this time. Try again
        later!
      </Alert>
    );
  }

  const detailsUrl = `/edit/pitch/${id}/details`;
  const typeUrl = `/edit/pitch/${id}/type`;
  const openingHoursUrl = `/edit/pitch/${id}/openingHours`;
  const imageUrl = `/edit/pitch/${id}/image`;
  const locationUrl = `/edit/pitch/${id}/location`;

  return (
    <>
      <HeaderWrapped />
      <div style={{ display: 'flex', backgroundColor: '#e5e7ed' }}>
        <MiniDrawer pitchId={id} />
        <main className={classes.main}>
          <PitchDataContext.Provider
            value={{
              pitch,
            }}
          >
            <Container maxWidth="lg" className={classes.container}>
              <Switch>
                <Route path={detailsUrl}>
                  <PitchDetailsV2 />
                </Route>
                <Route path={typeUrl}>
                  <PitchTypesV2 />
                </Route>
                <Route path={openingHoursUrl}>
                  <OpeningHoursV2 />
                </Route>
                <Route path={imageUrl}>
                  <PitchImageV2 />
                </Route>
                <Route path={locationUrl}>
                  <PitchLocationV2 />
                </Route>
              </Switch>
            </Container>
          </PitchDataContext.Provider>
        </main>
      </div>
    </>
  );
};

export default PitchEditor;
