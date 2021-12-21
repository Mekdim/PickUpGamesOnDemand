import "../css/App.css";
import React from "react";
import SearchResult from "../components/SearchResults";
import Footer from "../components/Footer.js";
import HeaderWrapped from "./HeaderWrapped";

function SearchResults() {
  return (
    <div className="App">
      <HeaderWrapped showSearchBar={true} />
      <SearchResult />
      <Footer />
    </div>
  );
}

export default SearchResults;
