import React from 'react';
import Grid from '@mui/material/Grid';
import { PitchCardLoading } from './PitchCardLoading';

export const PitchesLoading = () => {
  return (
    <Grid container spacing={3}>
      {[1, 2, 3].map((e) => {
        return (
          <Grid item xs={12} sm={6} md={4} lg={3} key={e}>
            <PitchCardLoading />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default PitchesLoading; 
