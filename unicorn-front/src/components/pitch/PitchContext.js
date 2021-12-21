import React, { createContext } from "react";
export const PitchContext = createContext({
  pitchId: null,
  setCurrentDate: null,
  setNextDate: null,
  setEvents: null,
});
