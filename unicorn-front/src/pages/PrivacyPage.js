import React from "react";
import Privacy from "../components/Privacy";
import Footer from "../components/Footer.js";
import HeaderWrapped from "./HeaderWrapped";

function PrivacyPage() {
  return (
    <div>
      <HeaderWrapped />
      <Privacy />
      <Footer />
    </div>
  );
}

export default PrivacyPage;
