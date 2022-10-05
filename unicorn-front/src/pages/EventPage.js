import EventSession from '../components/session/EventSession';
import Footer from '../components/Footer';
import React from 'react';
import { useParams } from 'react-router-dom';
import HeaderWrapped from './HeaderWrapped';

const EventPage = ({ className }) => {
  let { id } = useParams();
  return (
    <div className={className}>
      <HeaderWrapped />
      <EventSession sessionId={id} />
      <Footer />
    </div>
  );
};

export default EventPage;
