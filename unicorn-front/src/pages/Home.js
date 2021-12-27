import "../css/App.css";
import React, { Suspense, lazy } from "react";
import Skeleton from "@mui/material/Skeleton";
const HeaderWrapped = lazy(() =>
  import(/* webpackPrefetch: true */ "./HeaderWrapped")
);
const HomeContent = lazy(() =>
  import(/* webpackPrefetch: true */ "../components/HomeContent")
);
const Footer = lazy(() =>
  import(/*  webpackPrefetch: true */ "../components/Footer")
);

function Home() {
  return (
    <div className="App">
      <Suspense
        fallback={() => (
          <div>
            <Skeleton
              sx={{ mb: 4 }}
              variant="rectangular"
              height={70}
              animation="wave"
            />
          </div>
        )}
      >
        <HeaderWrapped showSearchBar={true} />
      </Suspense>
      <Suspense fallback={() => <div> Loading body... </div>}>
        <HomeContent />
      </Suspense>
      <Suspense fallback={() => <div> Loading footer... </div>}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default Home;
