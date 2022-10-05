import React from 'react';
import HeaderBar from '../components/HeaderBar';
import useScrollTrigger from '@mui/material/useScrollTrigger';

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

function HeaderWrapped(props) {
  return (
    <ElevationScroll {...props}>
      <HeaderBar {...props} />
    </ElevationScroll>
  );
}

export default HeaderWrapped;
