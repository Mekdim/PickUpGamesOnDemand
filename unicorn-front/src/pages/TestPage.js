import Footer from "../components/Footer";
import React from "react";
import HeaderBar from "../components/HeaderBar";
import Terms from "../components/Terms";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import CssBaseline from "@mui/material/CssBaseline";
import SearchBar from "../components/search/SearchBar";
import Toolbar from "@mui/material/Toolbar";
import SignUp from "../components/SignUp";
import Container from "@mui/material/Container";
import Picker from "../components/search/Picker";
import HeaderWrapped from "./HeaderWrapped";

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
      <Footer />
    </div>
  );
}

export default TestPage;
