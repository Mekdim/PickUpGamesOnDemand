import React from "react";
import AboutUs from "../components/AboutUs";
import Footer from "../components/Footer.js";
import HeaderWrapped from "./HeaderWrapped";

function AboutUsPage() {
  return (
    <div>
      <HeaderWrapped />
      <AboutUs />
      <Footer />
    </div>
  );
}

export default AboutUsPage;
