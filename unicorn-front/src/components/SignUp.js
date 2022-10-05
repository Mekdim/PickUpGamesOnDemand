import React, { useEffect, useState } from 'react';
import '../css/SignUp.css';
import { Button, Avatar, TextField, Link } from '@mui/material';
import { Container, Grid, Paper, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { actionTypes } from '../reducer';
import { useStateValue } from '../StateProvider'
import { useHistory, Link as NavLink } from "react-router-dom";
import { Formik, Form, Field } from 'formik'
import { auth } from '../Firebase'
import { getAuth, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import Cookies from 'js-cookie'
import firebase from 'firebase/compat/app'
import Loader from './Loader'
import FacebookIcon from '@mui/icons-material/Facebook';
import { logErrors, addInvitationCode, confirmInvitationCode } from "./logic/logic";
function SignUp() {
  const [state, dispatch] = useStateValue();
  const history = useHistory();
  //  Firebase repatcha
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [ invitationCodeGivenOrIgnored, setInvitationCodeGivenOrIgnored] = useState(false);
  const [invitationCode, setInvitationCode] = useState(null)
 
  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [backEndUrl, setBackEndUrl] = useState(
    process.env.REACT_APP_backEndUrl || 'http://localhost:8080'
  );
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
  const recaptchaVerifierSimple = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'sign-in-button',
      {
        size: 'invisible',
        callback: (response) => {
          //reCAPTCHA solved, allow signInWithPhoneNumber.
          //this.onSignInSubmit();
        },
      }
    );
  };


  
  const continueToSignUp = ()=> {
    setInvitationCodeGivenOrIgnored(true)
  }
  const  applyInvitationCode = async () => {
    if (!invitationCode){
      alert("Provide invitation Code to apply promo code. Otherwise, continue with out invitation code ")
      return 
    }
     try{
         let result = await confirmInvitationCode(invitationCode)
         alert("The invitation code is applied. Continue to the sign up process ")
         setInvitationCodeGivenOrIgnored(true)
     }catch(err){
        alert("The invitation code you gave might be invalid so we couldnt apply it . Continue with out invitation code ")
     }
  }
  const onPhoneSignInSubmit = () => {
    setLoading(true);
    const phonenumber = phoneNumber;
    console.log(phonenumber);
    recaptchaVerifierSimple();
    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phonenumber, appVerifier)
      .then((confirmationResult) => {
        setLoading(false);
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        console.log('sms  sent');
        window.confirmationResult = confirmationResult;

        const code = window.prompt('Enter verification code');
        confirmationResult
          .confirm(code)
          .then((result) => {
            // User signed in successfully.
            const user = result.user;
            setPhoneVerified(true);
            console.log('user verified the code correctly!');
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
            alert('The code you entered was incorrect. Try again!');
          });

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
        alert('There was some error processing your request!');
      });
  };

  const paperStyle = {
    padding: '20px',
    margin: '10px auto ',
  };
  const submit = (values, props) => {
    // email or password has to be set before signing up
    if (values.email == '') {
      return;
    }
    setLoading(true);
    auth.createUserWithEmailAndPassword(values.email, values.password).then(
      (result) => {
        console.log(result.user._delegate.uid);
        // set first name and lastname here so that user profile can be created on sign in observer
        setfirstName(values.firstname);
        setLastName(values.lastname);
        setLoading(false);
      },

      (error) => {
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
      }
    );
  };
  // this should be on mount and not on every rerender - will depend on lastname and firstname being set as well
  useEffect(() => {
    // if the user is signed up using firebase but the backend hasnt been updated, the signup will be reverted
    // we use the user object here to delete the signed up user (delete only works here after user is logged in)
    // this observer is called every time user is logged in and out
    const unsubscribe = auth.onAuthStateChanged(async (user) => {

      if (user) {
        // if email is nil it means the users hasnt still signed up using email and password (or facebook). This observer got called on phone verification
        if (user.email == null) {
          return;
        }
        // first name and lastname has to be set before calling the backend API
        if (firstName == '' || lastName == '') {
          return;
        }
        
        //setLoading(true);
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
            
            alert(
              'There was an error while verifying whether the email you provided exists or not '
            );
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
          // if emailresponse is undefined there must have some error checking for email
          if (!emailResponse){
            alert("Sorry, there was some error verifying whether the email exists or not in Kuaas")
            setLoading(false)
            auth.signOut();
            return 
          }
          // if it exists, likely from facebook login then we dont need to sign them up again
          if (emailResponse.emailExists){
            history.push('/signin');
            return 
          }
          
        fetch(`${backEndUrl}/users/addProfile`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          //phone number has to be inserted properly as well on sign up
          body: JSON.stringify({
            phone_number: phoneNumber ? phoneNumber : '',
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
            //addInvitationCode(invitationCode,"RECEIVER", result.id)

            // go to sign in page to grab the accesstoken. User is still logged in on firebase so
            // on login page the user object is already there
            if (firstName != '') {
              history.push('/signin');
            }
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
          });
        return;
      } else {
        // User is signed out and no action for now
      }
    });
    // this is called when component is unmounted
    return unsubscribe;
  }, [lastName]);

  return (
    <div className="signUp">
      <Paper elevation={8} style={paperStyle} className="signUp__paper">
        <Grid align="center">
          <Avatar style={{ backgroundColor: 'green' }}>
            {' '}
            <LockOutlinedIcon />{' '}
          </Avatar>
          <h2> Sign Up </h2>
        </Grid>

        <Formik
          initialValues={{
            email: '',
            password: '',
            firstname: '',
            lastname: '',
          }}
          onSubmit={submit}
        >
          {(props) => (
            <Form>
              {phoneVerified ? (
                <>
                  <Field
                    as={TextField}
                    label="Phone Number"
                    name="Phone Number"
                    placeholder="Example +251918224567"
                    type="phonenumber"
                    fullWidth
                    required
                    variant="standard"
                    style={{
                      backgroundColor: '#f7f7f7',
                      marginTop: '10px',
                      marginBottom: '10px',
                    }}
                    onChange={(event) => {
                      setPhoneNumber(event.target.value);
                    }}
                  />
                  <p>
                    {' '}
                    Your phone number is required for verification purposes. We
                    will be sending you verification code{' '}
                  </p>
                  <Button id="sign-in-button" onClick={onPhoneSignInSubmit}>
                    {' '}
                    Continue{' '}
                  </Button>
                </>
              ) : (
                <>
                 {invitationCodeGivenOrIgnored ? (
                  <>
                  <Field as={TextField} label="InvitationCode" name="invitationcode" placeholder="Enter invitation code to get 1 free gaming session"  fullWidth variant="standard" style={{ backgroundColor: "#f7f7f7", marginTop: "10px", marginBottom: "10px" }} onChange={(event) => { setInvitationCode(event.target.value) }} />
                  <p> You will be given two free gaming session if you have an invitation code</p>
                  <Button id="invitationcode-apply" color="primary" fullWidth variant="contained" style={{  marginTop: "10px", marginBottom: "10px" }} onClick={applyInvitationCode} > Apply Invitation Code </Button>
                  <Button id="invitationcode-continue" color="primary" fullWidth variant="contained" onClick={continueToSignUp} > Go to Sign up </Button>
                </>
                ):<>
                  
                 
                  <Field
                    as={TextField}
                    label="Firstname"
                    name="firstname"
                    placeholder="Enter first name"
                    fullWidth
                    required
                    variant="standard"
                    style={{
                      backgroundColor: '#f7f7f7',
                      marginTop: '10px',
                      marginBottom: '10px',
                    }}
                  />
                  <Field
                    as={TextField}
                    label="Lastname"
                    name="lastname"
                    placeholder="Enter last name"
                    fullWidth
                    required
                    variant="standard"
                    style={{
                      backgroundColor: '#f7f7f7',
                      marginTop: '10px',
                      marginBottom: '10px',
                    }}
                  />
                  <Field
                    as={TextField}
                    label="Email"
                    name="email"
                    placeholder="Enter your email"
                    fullWidth
                    required
                    variant="standard"
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
                    onClick={submit}
                  >
                    Sign up
                  </Button>

                  
                 </>}
                </>
              )}
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
          Do you have an account?
          <NavLink to="/signin">
            {' '}
            <Link href="#"> Sign in </Link>{' '}
          </NavLink>
        </Typography>
      </Paper>
      {loading ? <Loader /> : ''}
    </div>
  );
}

export default SignUp;
