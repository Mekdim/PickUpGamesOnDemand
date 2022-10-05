import Footer from '../components/Footer';
import React from 'react';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import SearchBar from '../components/search/SearchBar';
import HeaderWrapped from './HeaderWrapped';
import FileUpload from '../components/fileUpload/FileUpload';

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

function TestPage(props) {
  return (
    <div>
      {/*<ElevationScroll {...props}>*/}
      {/*  <HeaderBar />*/}
      {/*</ElevationScroll>*/}

      <HeaderWrapped {...props} />
      <SearchBar />
      <FileUpload setUploadUrl={() => {}} />
      <Footer />
    </div>
  );
}

export default TestPage;
