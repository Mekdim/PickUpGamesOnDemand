import "./css/App.css";
import React, { useEffect } from "react";
import ScrollToTop from "./ScrollToTop";
import Cookies from "js-cookie";
import { fetchNotification } from "./components/logic/logic";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const Home = React.lazy(() => import("./pages/Home"));
//import Home from "./pages/Home";
const SignIn = React.lazy(() => import("./pages/SignInPage"));
//import SignIn from "./pages/SignInPage";
const SignUp = React.lazy(() => import("./pages/SignUpPage"));
//import SignUp from "./pages/SignUpPage";
const Pitch = React.lazy(() => import("./pages/Pitch"));
//import Pitch from "./pages/Pitch";
const SearchResults = React.lazy(() => import("./pages/SearchResultsPage"));
//import SearchResults from "./pages/SearchResultsPage";
const Terms = React.lazy(() => import("./pages/TermsPage"));
//import Terms from "./pages/TermsPage";
const Privacy = React.lazy(() => import("./pages/PrivacyPage"));
//import Privacy from "./pages/PrivacyPage";
const AboutUs = React.lazy(() => import("./pages/AboutUsPage"));
//import AboutUs from "./pages/AboutUsPage";
const ContactUs = React.lazy(() => import("./pages/ContactUsPage"));
//import ContactUs from "./pages/ContactUsPage";

const ProfilePage = React.lazy(() => import("./pages/ProfilePage"));
//import ProfilePage from "./pages/ProfilePage";
const EventPage = React.lazy(() => import("./pages/EventPage"));
//import EventPage from "./pages/EventPage";
const TestPage = React.lazy(() => import("./pages/TestPage"));
//import TestPage from "./pages/TestPage";


function App() {
  const [state, dispatch] = useStateValue();

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
      <React.Suspense fallback={<p>Loading page...</p>}>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/profile">
          <ProfilePage />
        </Route>
        <Route path="/pitch/:id/:date">
          <Pitch className={"App"} />
        </Route>
        <Route path="/sessions/:id/">
          <EventPage className={"App"} />
        </Route>
        <Route path="/search_results">
          <SearchResults />
        </Route>
        <Route path="/terms">
          <Terms />
        </Route>
        <Route path="/privacy">
          <Privacy />
        </Route>
        <Route path="/aboutus">
          <AboutUs />
        </Route>
        <Route path="/test">
          <TestPage />
        </Route>
        <Route path="/contactus">
          <ContactUs className={"App"} />
        </Route>
        </React.Suspense>
      </Switch>
    </Router>
  );
}

export default App;
