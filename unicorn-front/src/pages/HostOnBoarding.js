import HeaderWrapped from './HeaderWrapped';
import React from 'react';
import HostWelcome from '../components/host/HostWelcome';

const HostOnBoarding = ({ className }) => {
  return (
    <div className={className}>
      <HeaderWrapped />
      <HostWelcome />
    </div>
  );
};

export default HostOnBoarding;
