import React, { useEffect, useState } from "react";
import "../css/SignIn.css";
import { Button, Avatar, TextField, Link } from "@mui/material";
import { Grid, Paper, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { actionTypes } from "../reducer";
import { useStateValue } from "../StateProvider";
import { useHistory, Link as NavLink } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { auth } from "../Firebase";
import Cookies from "js-cookie";
import Loader from "./Loader";
import { fetchNotification, getUserProfile, getTokensOnLogin } from "./logic/logic";

function SignIn() {
  const [loading, setLoading] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [passwordResetEmail, setPasswordResetEmail] = useState(null);
  const [state, dispatch] = useStateValue();
  const history = useHistory();
  const paperStyle = {
    padding: "20px",
    height: "70vh",
    margin: "10px auto ",
  };
  const sendPasswordResetEmail = () => {
    if (!passwordResetEmail) {
      alert("Make sure you enter your email address");
      return;
    }
    setLoading(true);
    auth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        setLoading(false);
        alert("An email is sent with alink to reset your password!");
        console.log("password sent to email");
      })
      .catch((error) => {
        setLoading(false);
        alert(
          "sorry, there was an error sending reset email to the email provided!"
        );
      });
  };
  const submit = (values) => {
    setLoading(true);

    auth
      .signInWithEmailAndPassword(values.email, values.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setLoading(false);
        // ...
      })
      .catch((error) => {
        setLoading(false);
        alert(
          "Sorry, something went wrong! The email or the password you provided is wrong!"
        );
      });
  };
  // useEffect
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setLoading(true);
        try {
          let tokensResult = await getTokensOnLogin(user.uid)
          if (tokensResult && tokensResult.accessToken){
            Cookies.set("accessToken", tokensResult.accessToken)
            Cookies.set("refreshToken", tokensResult.refreshToken)
          }
          else{
            alert(
              "Sorry, Some server error happended while logging in. We couldnt grab tokens for you!"
            );
            return
          }
          let result = await getUserProfile(user.uid);
          if (result.length > 0) {
            const loggedUser = {
              email: user.email,
              uid: user.uid,
              phonenumber: result[0].phone_number,
              firstname: result[0].first_name,
              lastname: result[0].last_name,
              id: result[0].id,
            };
            Cookies.set("firstname", result[0].first_name);
            Cookies.set("email", user.email);
            Cookies.set("uid", user.uid);
            Cookies.set("id", result[0].id);
            dispatch({
              type: actionTypes.SET_USER,
              user: loggedUser,
            });

            try {
              let notifications = await fetchNotification(loggedUser.id);
              dispatch({
                type: actionTypes.SET_USER_NOTIFICATIONS,
                userNotifications: notifications,
              });
            } catch (notificationError) {
              console.error("Unable to fetch notifications");
            }
            history.push("/");
          }
        } catch (error) {
          setLoading(false);
          auth.signOut();
          alert(
            "Sorry, Some server error happended while logging in. Try again!"
          );
          // if error comes from backend API - we can grab the mesage here or send it to logger in the future
          if (typeof error.json === "function") {
            error
              .json()
              .then((error) => {})
              .catch((genericError) => {});
          }
        }
      }
    });

    // this is called when component is unmounted
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="signIn">
      <Paper elevation={10} style={paperStyle} className="signIn__paper">
        <Grid align="center">
          <Avatar style={{ backgroundColor: "green" }}>
            <LockOutlinedIcon />
          </Avatar>
          {!forgotPassword ? (
            <>
              <h2> Sign In </h2>
            </>
          ) : (
            <h2> Reset your Password </h2>
          )}
        </Grid>
        {forgotPassword ? (
          <>
            <TextField
              label="Email"
              name="email"
              placeholder="Enter email"
              fullWidth
              required
              variant="outlined"
              style={{
                backgroundColor: "#f7f7f7",
                marginTop: "10px",
                marginBottom: "10px",
              }}
              onChange={(event) => {
                setPasswordResetEmail(event.target.value);
              }}
            />
            <Button
              type="submit"
              color="primary"
              fullWidth
              variant="contained"
              style={{ marginTop: "10px", marginBottom: "10px" }}
              onClick={(e) => {
                e.preventDefault();
                setForgotPassword(false);
              }}
            >
              Go Back
            </Button>
            <Button
              type="submit"
              color="primary"
              fullWidth
              variant="contained"
              style={{ marginTop: "10px", marginBottom: "10px" }}
              onClick={sendPasswordResetEmail}
            >
              Submit
            </Button>
          </>
        ) : (
          <>
            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={submit}
            >
              {(props) => (
                <Form>
                  <Field
                    as={TextField}
                    label="Email"
                    name="email"
                    placeholder="Enter email"
                    fullWidth
                    required
                    variant="outlined"
                    style={{
                      backgroundColor: "#f7f7f7",
                      marginTop: "10px",
                      marginBottom: "10px",
                    }}
                  />
                  <Field
                    as={TextField}
                    label="Password"
                    name="password"
                    placeholder="Enter password"
                    type="password"
                    fullWidth
                    required
                    variant="standard"
                    style={{
                      backgroundColor: "#f7f7f7",
                      marginTop: "10px",
                      marginBottom: "10px",
                    }}
                  />
                  <Button
                    type="submit"
                    color="primary"
                    fullWidth
                    variant="contained"
                    style={{ marginTop: "10px", marginBottom: "10px" }}
                  >
                    Sign In
                  </Button>
                </Form>
              )}
            </Formik>
            <Typography>
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setForgotPassword(true);
                }}
              >
                Forgot Password?
              </Link>
            </Typography>

            <Typography>
              Don't have an account?
              <NavLink to="/signup">
                <Link href="#"> Sign Up </Link>{" "}
              </NavLink>
            </Typography>
          </>
        )}
      </Paper>
      {loading ? <Loader /> : ""}
    </div>
  );
}

export default SignIn;
