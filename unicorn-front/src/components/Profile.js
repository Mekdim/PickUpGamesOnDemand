import React, { useState, useEffect } from 'react';
import '../css/Profile.css';
import { useStateValue } from '../StateProvider';
import Cookies from 'js-cookie';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
} from '@mui/material';
import Loader from './Loader';
import { refreshTheToken, getUserIds, logErrors } from './logic/logic';
import { actionTypes } from '../reducer';
function ProfilePage() {
  const storage = firebase.storage();
  const [open, setOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const [profileDetails, setProfileDetails] = useState({});
  const [profileImage, setProfileImage] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [state, dispatch] = useStateValue();
  const [userId, setUserId] = useState(state.user?.uid || null);
  const [id, setId] = useState(state.user?.id || Cookies.get('id') || null);
  const [profileUpdated, setProfileUpdated] = useState(null);
  const [firstname, setFirstName] = useState(null);
  const [lastname, setLastName] = useState(null);
  const [address, setAddress] = useState(null);
  const [backEndUrl, setBackEndUrl] = useState(
    process.env.REACT_APP_backEndUrl || 'http://localhost:8080'
  );

  const handleProfilePictureChange = (event) => {
    // Mark: Validate file is image?  set the image
    if (event.target.files[0]) {
      //setProfileImage(event.target.files[0])
      handleImageUpload(event.target.files[0]);
    }
  };
  const handleImageUpload = (image) => {
    const updateTask = storage.ref(`images/${image.name}`).put(image);
    //setisLoading(true)
    updateTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setUploadProgress(progress);
      },
      (error) => {
        console.log(error);
        alert('opps someting went wrong when uploading image');
        setisLoading(false);
      },
      () => {
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // update the backend db with the profile image url
            fetch(`${backEndUrl}/users/addProfilePicture`, {
              method: 'POST',
              headers: {
                'Content-type': 'application/json',
              },
              body: JSON.stringify({
                image_url: url,
                image_id: profileDetails.id,
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
                // Successfully added pro pic
                setProfileImageUrl(url);
                setUploadProgress(0);
                setisLoading(false);
              })
              .catch((error) => {
                setisLoading(false);
                // error can come from rejected Promise fetch api error or from backend API
                // console.log(error.status)
                alert(
                  'Sorry, Some server error happended while adding the  profile picture!'
                );
                // if error comes from backend API - we can grab the mesage here or send it to logger in the future
                if (typeof error.json === 'function') {
                  error
                    .json()
                    .then((error) => {
                      //console.log("An API error from backend API while adding user profile picture for  user in for userid XXX");
                    })
                    .catch((genericError) => {
                      //console.log("Another error ");
                    });
                } else {
                  // error status undefined here
                  //console.log("some sort of fetch error happended")
                }
              });
          });
      }
    );
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const UpdateProfileInfo = () => {
    let bearer_token = Cookies.get('accessToken');
    if (!bearer_token) {
      alert(
        ' we couldnt get your stored sessionin  data . Please try logging in again'
      );
    }
    return fetch(`${backEndUrl}/users/updateProfile`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + bearer_token,
      },
      body: JSON.stringify({
        address: address,
        uid: userId,
        first_name: firstname,
        last_name: lastname,
      }),
    }).then((response) => {
      if (response.status == 403) {
        // throw the promise to catch and
        // display message from backend API
        return 'Token expired error';
      }
      if (!response.ok) {
        // throw the promise to catch and
        // display message from backend API
        throw response;
      } else return response.json();
    });
  };
  const updateProfileInfoWithRetry = async (refreshEnabled = true) => {
    setisLoading(true);
    try {
      let result = await UpdateProfileInfo();
      if (result == 'Token expired error' && refreshEnabled) {
        let tokens = await refreshTheToken();
        if (!tokens) {
          console.log(
            'We couldnt get new tokens and refresh token for you. Sorry'
          );
          return;
          //alert("We couldnt get new tokens and refresh token for you. Sorry")
        }
        Cookies.set('accessToken', tokens.accessToken);
        Cookies.set('refreshToken', tokens.refreshToken);
        updateProfileInfoWithRetry(false);
      } else if (result !== 'Token expired error') {
        setProfileUpdated(result);
        setisLoading(false);
      }
    } catch (error) {
      setisLoading(false);
      // error can come from rejected Promise fetch api error or from backend API
      // console.log(error.status)
      alert(
        'Sorry, Some server error happended while updating profile details!'
      );
      // if error comes from backend API - we can grab the mesage here or send it to logger in the future
      if (typeof error.json === 'function') {
        error
          .json()
          .then((error) => {
            //console.log("An API error from backend API while updating profile for userid XXX");
          })
          .catch((genericError) => {
            //console.log("Another error ");
          });
      } else {
        console.log(error);
        // error status undefined here
        //console.log("some sort of fetch error happended")
      }
    }
    setOpen(false);
  };
  const getUid = async (refreshEnabled = true) => {
    // if user id exists no need to get user id
    if (userId) {
      return;
    }
    try {
      let result = await getUserIds();
      if (result == 'Token expired error' && refreshEnabled) {
        let tokens = await refreshTheToken();
        console.log('here are the tokens', tokens);
        if (!tokens) {
          console.log(
            'We couldnt get new tokens and refresh token for you. Sorry'
          );
          return;
          //alert("We couldnt get new tokens and refresh token for you. Sorry")
        }
        Cookies.set('accessToken', tokens.accessToken);
        Cookies.set('refreshToken', tokens.refreshToken);
        getUid(false);
      } else if (result && result.uid) {
        setUserId(result.uid);
        console.log(result);
        const loggedUser = {
          uid: result.uid,

          firstname: result.firstname,
          lastname: result.lastname,
          id: result.id,
        };

        dispatch({
          type: actionTypes.SET_USER,
          user: loggedUser,
        });
      }
    } catch (error) {
      console.log(error);
      alert(
        'Sorry, Some server error happended while fetching unique user id! Try logging in again'
      );
      // if error comes from backend API - we can grab the mesage here or send it to logger in the future
      if (typeof error.json === 'function') {
        error
          .json()
          .then((error) => {
            //console.log("An API error from backend API while fetching user in for userid XXX");
          })
          .catch((genericError) => {
            //console.log("Another error ");
          });
      } else {
        // error status undefined here
        //console.log("some sort of fetch error happended")
      }
    }
  };
  const fetchUserInfo = () => {
    // if user id hasnt been fetched return empty array
    if (userId == null) {
      return [];
    }
    let bearer_token = Cookies.get('accessToken');
    if (!bearer_token) {
      alert(
        ' we couldnt get your stored sessionin  data . Please try logging in again '
      );
    }
    return fetch(`${backEndUrl}/users/getProfile/` + userId, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + bearer_token,
      },
    }).then((response) => {
      if (response.status == 403) {
        // throw the promise to catch and
        // display message from backend API
        return 'Token expired error';
      }
      if (!response.ok) {
        // throw the promise to catch and
        // display message from backend API
        throw response;
      } else return response.json();
    });
  };
  const getUserPhoto = (id) => {
    let bearer_token = Cookies.get('accessToken');
    if (!bearer_token) {
      alert(
        ' we could get your stored sessionin  data . Please try logging in again '
      );
    }
    return fetch(`${backEndUrl}/users/getProfilePicture/` + id, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + bearer_token,
      },
      //phone number has to be inserted properly as well on sign up
    }).then((response) => {
      if (!response.ok) {
        // throw the promise to catch and
        // display message from backend API
        throw response;
      } else return response.json();
    });
  };
  const FetchProfileInfoAndPicture = async (refreshEnabled = true) => {
    console.log(refreshEnabled);
    try {
      //setisLoading(true)
      let result = await fetchUserInfo();
      if (result == 'Token expired error' && refreshEnabled) {
        let tokens = await refreshTheToken();
        console.log('here are te tokens', tokens);
        if (!tokens) {
          console.log(
            'We couldnt get new tokens and refresh token for you. Sorry'
          );
          return;
          //alert("We couldnt get new tokens and refresh token for you. Sorry")
        }
        Cookies.set('accessToken', tokens.accessToken);
        Cookies.set('refreshToken', tokens.refreshToken);
        FetchProfileInfoAndPicture(false);
      } else if (result.length > 0 && result[0].id) {
        const profile = {
          id: result[0].id,
          firstName: result[0].first_name,
          lastName: result[0].last_name,
          phoneNumber: result[0].phone_number,
          email: result[0].email,
          location: result[0].address,
        };
        setisLoading(false);
        setProfileDetails(profile);
        setFirstName(profile.firstName);
        setLastName(profile.lastName);
        setAddress(profile.location);
        let profilePictureResult = await getUserPhoto(result[0].id);
        if (profilePictureResult.length > 0) {
          setProfileImageUrl(profilePictureResult[0].image_url);
        }
      }
    } catch (error) {
      if (error.statusText) {
        logErrors(
          `There was an error for user ${Cookies.get(
            'firstname'
          )} with id ${Cookies.get('id')} : ${error.statusText}`
        );
      }
      if (typeof error.toString() === 'string') {
        logErrors(
          `There was an error for user ${Cookies.get(
            'firstname'
          )} with id ${Cookies.get('id')} : ${error.toString()}`
        );
      }

      setisLoading(false);
      // error can come from rejected Promise fetch api error or from backend API
      // console.log(error.status)
      //alert("Sorry, Some server error happended while fetching profile details or profile picture!")
      // if error comes from backend API - we can grab the mesage here or send it to logger in the future
      if (typeof error.json === 'function') {
        error
          .json()
          .then((error) => {
            console.log(error);
            logErrors(
              `There was an error for user ${Cookies.get(
                'firstname'
              )} with id ${Cookies.get('id')} : ${error.error?.message}`
            );
            //console.log("An API error from backend API while fetching user in for userid XXX");
          })
          .catch((genericError) => {
            //console.log("Another error ");
          });
      } else {
        // error status undefined here
        //console.log("some sort of fetch error happended")
      }
    }
  };

  // run  on the first render and as profile gets updated
  useEffect(FetchProfileInfoAndPicture, [profileUpdated, userId]);
  useEffect(getUid, []);

  return (
    <div>
      <div className="profilePage__content">
        <div className="profilePage__imageSection">
          <div className="profilePage__imageSection__image">
            <img
              src={
                profileImageUrl ||
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuqf58ptYjurFfvxzCIylYa9tD6s_011kbKw&usqp=CAU'
              }
              alt=""
            />
            <input
              type="file"
              name="Upload Image"
              accept="image/*"
              id="imageInput"
              onChange={handleProfilePictureChange}
            />
            <label htmlFor="imageInput"> Change Profile Picture</label>
            {uploadProgress <= 100 && uploadProgress > 0 ? (
              <div className="profilePage__imageSection__image__loader">
                <CircularProgress
                  className="profilePage__imageSection__image__loader__icon"
                  variant="determinate"
                  value={uploadProgress}
                />
              </div>
            ) : (
              ''
            )}
          </div>

          <Button onClick={handleClickOpen}> Edit Profile </Button>

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogContent>
              <DialogContentText></DialogContentText>
              <TextField
                required
                autoFocus
                margin="dense"
                id="firstname"
                label="First Name"
                value={firstname}
                onChange={(event) => setFirstName(event.target.value)}
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                id="lastname"
                label="Last Name"
                value={lastname}
                onChange={(event) => setLastName(event.target.value)}
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                id="address"
                label="Address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={updateProfileInfoWithRetry}>Save</Button>
            </DialogActions>
          </Dialog>
        </div>
        <div className="profilePage__content__info">
          <p>
            {' '}
            <b>Contact Information </b>{' '}
          </p>
          <div className="profilePage__content__pairsOfInfo">
            <p> Full Name: </p>
            <p style={{ color: 'blue' }}>
              {' '}
              {profileDetails.firstName} {profileDetails.lastName}{' '}
            </p>
          </div>
          <div className="profilePage__content__pairsOfInfo">
            <p> Phone Number: </p>
            <p style={{ color: 'blue' }}> {profileDetails.phoneNumber} </p>
          </div>
          <div className="profilePage__content__pairsOfInfo">
            <p> EMail: </p>
            <p style={{ color: 'blue' }}> {profileDetails.email} </p>
          </div>

          <p>
            {' '}
            <b>General Information </b>{' '}
          </p>

          <div className="profilePage__content__pairsOfInfo">
            <p> Location: </p>
            <p style={{ color: 'blue' }}> {profileDetails.location} </p>
          </div>
        </div>
      </div>
      {isLoading ? <Loader /> : ''}
    </div>
  );
}

export default ProfilePage;
