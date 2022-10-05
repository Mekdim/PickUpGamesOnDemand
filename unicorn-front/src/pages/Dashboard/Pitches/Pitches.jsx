import React from 'react';
import { PitchCard } from './PitchCard';
import Grid from '@mui/material/Grid';
import PitchesLoading from './PitchLoading/PitchesLoading';
import useManagedPitches from './hooks/useManagedPitches';
import { Alert } from '@mui/material';

export const Pitches = () => {
  const { pitches, isLoading, isError } = useManagedPitches();

  if (isLoading) {
    return <PitchesLoading />;
  }

  if (isError) {
    return (
      <Alert variant={'outlined'} severity={'error'}>
        We are currently unable to get your pitches. Try again later!
      </Alert>
    );
  }

  return (
    <Grid container spacing={2}>
      {pitches.map((pitch) => {
        return (
          <Grid item xs={12} sm={6} md={4} lg={3} key={pitch.id}>
            <PitchCard
              path={`/manage/pitch/${pitch.id}`}
              key={pitch.id}
              pitchId={pitch.id}
              src={pitch.src}
              name={pitch.name}
              description={pitch.description}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};
