import React, { createContext } from 'react';
export const PitchContext = createContext({
  pitchId: null,
  pitch: null,
  setCurrentDate: null,
  setNextDate: null,
  setSecondNextDate: null,
  setThirdNextDate: null,
  setEvents: null,
  setOpeningHours: null,
});
