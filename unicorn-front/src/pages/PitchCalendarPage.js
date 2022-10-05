import React from 'react';
import HeaderWrapped from './HeaderWrapped';
import { PitchCalendar } from '../components/pitchCalendar/PitchCalendar';
import { useParams } from 'react-router-dom';

const PitchCalendarPage = (props) => {
  const { id } = useParams();
  return (
    <div>
      <HeaderWrapped {...props} />
      <PitchCalendar pitchId={id} />
    </div>
  );
};

export default PitchCalendarPage;
