import "../css/App.css";
import React from "react";
import HomeContent from "../components/HomeContent.js";
import Footer from "../components/Footer.js";
import HeaderWrapped from "./HeaderWrapped";

function Home() {
  return (
    <div className="App">
      {/*<Header showSearchComponent={false} />*/}
      <HeaderWrapped showSearchBar={true} />
      <HomeContent />
      <Footer />
    </div>
  );
}

export default Home;
