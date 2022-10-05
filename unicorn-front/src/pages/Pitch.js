import '../css/App.css';
import React from 'react';
import PitchSession from '../components/pitch/PitchSessions.js';
import Footer from '../components/Footer.js';
import { useParams } from 'react-router-dom';
import HeaderWrapped from './HeaderWrapped';

function Pitch({ className }) {
  let { id, date } = useParams();
  return (
    <div className={className}>
      <HeaderWrapped />
      <PitchSession pitchId={id} date={date} />
      <Footer />
    </div>
  );
}

export default Pitch;
