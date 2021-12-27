import "./css/App.css";
import React, { useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import Cookies from "js-cookie";
import { fetchNotification } from "./components/logic/logic";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";

const Home = lazy(() => import("./pages/Home"));
const SignIn = lazy(() => import("./pages/SignInPage"));
const SignUp = lazy(() => import("./pages/SignUpPage"));
const Pitch = lazy(() => import("./pages/Pitch"));
const SearchResults = lazy(() => import("./pages/SearchResultsPage"));
const Terms = lazy(() => import("./pages/TermsPage"));
const Privacy = lazy(() => import("./pages/PrivacyPage"));
const AboutUs = lazy(() => import("./pages/AboutUsPage"));
const ContactUs = lazy(() => import("./pages/ContactUsPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const EventPage = lazy(() => import("./pages/EventPage"));

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(async () => {
    try {
      let playerId = Cookies.get("id");
      if (playerId) {
        let notifications = await fetchNotification(playerId);
        dispatch({
          type: actionTypes.SET_USER_NOTIFICATIONS,
          userNotifications: notifications,
        });
      }
    } catch (error) {
      console.error("Unable to fetch notifications ", error);
    }
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Switch>
       <Suspense fallback={() => <div> Loading...</div>}>
        <Route exact path="/">
          <Suspense fallback={() => <div> Loading...</div>}>
            <Home />
          </Suspense>
        </Route>
        <Route path="/signin">
          <Suspense fallback={() => <div> Loading...</div>}>
            <SignIn />
          </Suspense>
        </Route>
        <Route path="/signup">
          <Suspense fallback={() => <div> Loading...</div>}>
            <SignUp />
          </Suspense>
        </Route>
        <Route path="/profile">
          <Suspense fallback={() => <div> Loading...</div>}>
            <ProfilePage />
          </Suspense>
        </Route>
        <Route path="/pitch/:id/:date">
          <Suspense fallback={() => <div> Loading...</div>}>
            <Pitch className={"App"} />
          </Suspense>
        </Route>
        <Route path="/sessions/:id/">
          <Suspense fallback={() => <div> Loading...</div>}>
            <EventPage className={"App"} />
          </Suspense>
        </Route>
        <Route path="/search_results">
          <Suspense fallback={() => <div> Loading...</div>}>
            <SearchResults />
          </Suspense>
        </Route>
        <Route path="/terms">
          <Suspense fallback={() => <div> Loading...</div>}>
            <Terms />
          </Suspense>
        </Route>
        <Route path="/privacy">
          <Suspense fallback={() => <div> Loading...</div>}>
            <Privacy />
          </Suspense>
        </Route>
        <Route path="/aboutus">
          <Suspense fallback={() => <div> Loading...</div>}>
            <AboutUs />
          </Suspense>
        </Route>
        <Route path="/contactus">
          <Suspense fallback={() => <div> Loading...</div>}>
            <ContactUs className={"App"} />
          </Suspense>
        </Route>
        </Suspense>
      </Switch>
    </Router>
  );
}

export default App;
