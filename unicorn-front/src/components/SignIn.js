import React, { useEffect, useState } from 'react';
import '../css/SignIn.css';
import { Button, Avatar, TextField, Link } from '@mui/material';
import { Grid, Paper, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { actionTypes } from '../reducer';
import { useStateValue } from '../StateProvider';
import { useHistory, Link as NavLink } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { auth } from '../Firebase';
import Cookies from 'js-cookie';
import Loader from './Loader';
import FacebookIcon from '@mui/icons-material/Facebook';
import { getAuth, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import {
  fetchNotification,
  getUserProfile,
  getTokensOnLogin,
} from './logic/logic';
import { logErrors } from './logic/logic';
function SignIn() {
  const [loading, setLoading] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [passwordResetEmail, setPasswordResetEmail] = useState(null);
  const [state, dispatch] = useStateValue();
  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [backEndUrl, setBackEndUrl] = useState(
    process.env.REACT_APP_backEndUrl || 'http://localhost:8080'
  );
  const history = useHistory();
  const paperStyle = {
    padding: '20px',
    height: '70vh',
    margin: '10px auto ',
  };
  const signInWithFaceBook = ()=>{
    const provider = new FacebookAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider).then((result) => {
      // The signed-in user info.
      const user = result.user;
      console.log(user)
      setfirstName(user.displayName.split(" ")[0]);
      setLastName(user.displayName.split(" ")[1]);
    })
    .catch((error) => {
      if (error.code) {
        logErrors(
          `There was an error for user ${Cookies.get(
            'firstname'
          )} with id ${Cookies.get('id')} : ${error.code}`
        );
      } else if (typeof error.toString() === 'string') {
        logErrors(
          `There was an error for user ${Cookies.get(
            'firstname'
          )} with id ${Cookies.get('id')} : ${error.toString()}`
        );
      }
      setLoading(false);
      if (error.code != 'auth/admin-restricted-operation') {
        alert(
          error.code +
            '. sorry there was some error procesing your request. check your email and password!'
        );
      }
      console.log(error.code);
      const errorMessage = error.message;
      console.log(errorMessage)
    });
  }

  const sendPasswordResetEmail = () => {
    if (!passwordResetEmail) {
      alert('Make sure you enter your email address');
      return;
    }
    setLoading(true);
    auth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        setLoading(false);
        alert('An email is sent with alink to reset your password!');
        console.log('password sent to email');
      })
      .catch((error) => {
        if (error.statusText) {
          logErrors(
            `There was an error for user ${Cookies.get(
              'firstname'
            )} with id ${Cookies.get('id')} : ${error.statusText}`
          );
        } else if (typeof error.toString() === 'string') {
          logErrors(
            `There was an error for user ${Cookies.get(
              'firstname'
            )} with id ${Cookies.get('id')} : ${error.toString()}`
          );
        }
        setLoading(false);
        alert(
          'sorry, there was an error sending reset email to the email provided!'
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
        if (error.statusText) {
          logErrors(
            `There was an error for user ${Cookies.get(
              'firstname'
            )} with id ${Cookies.get('id')} : ${error.statusText}`
          );
        } else if (typeof error.toString() === 'string') {
          logErrors(
            `There was an error for user ${Cookies.get(
              'firstname'
            )} with id ${Cookies.get('id')} : ${error.toString()}`
          );
        }
        setLoading(false);
        alert(
          'Sorry, something went wrong! The email or the password you provided is wrong!'
        );
      });
  };
  // useEffect
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      // if the user is logged in using facebook and it is the first time, we have to sign him/her up
      // to Kuaas. So we have to check if the email is already registered in kuaas
      
      
      if (user) {
        // if email is nil it means the users hasnt still signed up using email and password (or facebook). This observer got called on phone verification
        if (user.email == null) {
          return;
        }
       
        setLoading(true);
        // check if email already exists
        let emailResponse = await fetch(`${backEndUrl}/users/checkEmailExists`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          //phone number has to be inserted properly as well on sign up
          body: JSON.stringify({
            email: user.email
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw response;
            } else return response.json();
          }).catch((error) => {
            console.log(error)
            if (error.statusText) {
              logErrors(
                `TThere was an error verifing existence of email for user ${Cookies.get(
                  'firstname'
                )} with id ${Cookies.get('id')} : ${error.statusText}`
              );
            } else if (typeof error.toString() === 'string') {
              logErrors(
                `There was an error while verifing existence of email  for user ${Cookies.get(
                  'firstname'
                )} with id ${Cookies.get('id')} : ${error.toString()}`
              );
            }
            setLoading(false);
            
            // if error comes from backend API - we can grab the mesage here or send it to logger in the future
            if (typeof error.json === 'function') {
              error
                .json()
                .then((error) => {
                  //console.log("An API error from backend API while verifying user for userid XXX");
                })
                .catch((genericError) => {
                  //console.log("Another error ");
                });
            } else {
              // error status undefined here
              
            }
          })
          // if email exists already no need to sign up. For example on facebook sign in, the first time
          // we will sign up. But After that, we have to check if the user is already signed up when signing
          // in using facebook 
          // if emailresponse is undefined there must have some been error checking for email
          if (!emailResponse){
            alert("Sorry, there was some error verifying whether the email exists or not in Kuaas")
            setLoading(false)
            auth.signOut();
            return 
          }
          // if email doesnt exist , let sign him up by adding him to kuaas (likely facebook login)
        try{
           if (emailResponse && !emailResponse.emailExists){
             // first name and lastname has to be set before calling the backend API
             if (firstName == '' || lastName == '') {
              setLoading(false)
              return;
             }
            await fetch(`${backEndUrl}/users/addProfile`, {
              method: 'POST',
              headers: {
                'Content-type': 'application/json',
              },
              //phone number has to be inserted properly as well on sign up
              
              body: JSON.stringify({
                phone_number: '',
                email: user.email,
                uid: user.uid,
                first_name: firstName,
                last_name: lastName,
              }),
            })
              .then((response) => {
                if (!response.ok) {
                  // throw the promise to catch and
                  // display message from backend API
                  throw response;
                } else return response.json();
              })
              .then((result) => {
                setLoading(false);
                
              })
              .catch((error) => {
                if (error.statusText) {
                  logErrors(
                    `There was an error for user ${Cookies.get(
                      'firstname'
                    )} with id ${Cookies.get('id')} : ${error.statusText}`
                  );
                } else if (typeof error.toString() === 'string') {
                  logErrors(
                    `There was an error for user ${Cookies.get(
                      'firstname'
                    )} with id ${Cookies.get('id')} : ${error.toString()}`
                  );
                }
                
                setLoading(false);
                // error can come from rejected Promise fetch api error or from backend API
                // console.log(error.status)
                // delete user bacause profile could not be updated on the backend tho firebase signup worked
                user
                  .delete()
                  .then(function () {
                    console.log('userdeleted');
                    // User deleted.
                  })
                  .catch(function (error) {
                    // An error happened while trying to delete the user - send to logger
                  });
                alert(
                  'Sorry,  Your information is not fully updated! some server error happened. Try again '
                );
                // if error comes from backend API - we can grab the mesage here or send it to logger in the future
                if (typeof error.json === 'function') {
                  error
                    .json()
                    .then((error) => {
                      //console.log("An API error from backend API while signing up for userid XXX");
                    })
                    .catch((genericError) => {
                      //console.log("Another error ");
                    });
                } else {
                  // error status undefined here
                  //console.log("some sort of fetch error happended")
                }
                auth.signOut();
                setLoading(false)
                return
              });
              
           }
          } catch(error){
            
            console.log(error)
            auth.signOut();
            setLoading(false)
            return
            
          }
          
        

        try {
          let tokensResult = await getTokensOnLogin(user.uid);
          if (tokensResult && tokensResult.accessToken) {
            Cookies.set('accessToken', tokensResult.accessToken);
            Cookies.set('refreshToken', tokensResult.refreshToken);
          } else {
            alert(
              'Sorry, Some server error happended while logging in. We couldnt grab tokens for you!'
            );
            return;
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
            Cookies.set('firstname', result[0].first_name);
            Cookies.set('email', user.email);
            Cookies.set('id', result[0].id);
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
              console.error('Unable to fetch notifications');
            }
            history.push('/');
          }
        } catch (error) {
          setLoading(false);
          auth.signOut();
          if (error.statusText) {
            logErrors(
              `There was an error for user ${Cookies.get(
                'firstname'
              )} with id ${Cookies.get('id')} : ${error.statusText}`
            );
          } else if (typeof error.toString() === 'string') {
            logErrors(
              `There was an error for user ${Cookies.get(
                'firstname'
              )} with id ${Cookies.get('id')} : ${error.toString()}`
            );
          }
          alert(
            'Sorry, Some server error happended while logging in. Try again!'
          );
          // if error comes from backend API - we can grab the mesage here or send it to logger in the future
          if (typeof error.json === 'function') {
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
  }, [lastName]);

  return (
    <div className="signIn">
      <Paper elevation={10} style={paperStyle} className="signIn__paper">
        <Grid align="center">
          <Avatar style={{ backgroundColor: 'green' }}>
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
                backgroundColor: '#f7f7f7',
                marginTop: '10px',
                marginBottom: '10px',
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
              style={{ marginTop: '10px', marginBottom: '10px' }}
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
              style={{ marginTop: '10px', marginBottom: '10px' }}
              onClick={sendPasswordResetEmail}
            >
              Submit
            </Button>
          </>
        ) : (
          <>
            <Formik
              initialValues={{ email: '', password: '' }}
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
                      backgroundColor: '#f7f7f7',
                      marginTop: '10px',
                      marginBottom: '10px',
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
                      backgroundColor: '#f7f7f7',
                      marginTop: '10px',
                      marginBottom: '10px',
                    }}
                  />
                  <Button
                    type="submit"
                    color="primary"
                    fullWidth
                    variant="contained"
                    style={{ marginTop: '10px', marginBottom: '5px' }}
                  >
                    Sign In
                  </Button>
                </Form>
              )}
            </Formik>
            <h3 style={{"text-align": "center"}}> OR </h3>
            <Button
              type="submit"
              color="primary"
              fullWidth
              variant="contained"
              style={{ marginTop: '5px', marginBottom: '5px' }}
             onClick={signInWithFaceBook}
            >
                <FacebookIcon style={{ color: 'white', marginRight: '12px' }} />  LogIn with Facebook
            </Button>
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
                <Link href="#"> Sign Up </Link>{' '}
              </NavLink>
            </Typography>
          </>
        )}
      </Paper>
      {loading ? <Loader /> : ''}
    </div>
  );
}

export default SignIn;
