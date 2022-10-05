import React, { useState, useRef, useEffect } from 'react';
import '../../../css/MessageBoard.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useStateValue } from '../../../StateProvider';
import Cookies from 'js-cookie';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import { getUserIds, refreshTheToken, logErrors } from '../../logic/logic';
import { actionTypes } from '../../../reducer';
import { useTranslation } from 'react-i18next';
import Send from '../../icons/Send';
import { SendMessageButton } from './MessageStyle';
import { Alert, Button, Snackbar } from '@mui/material';
const firestore = firebase.firestore();

const MessageBoard = ({ sessionId }) => {
  const [state, dispatch] = useStateValue();
  const [userId, setUserId] = useState(state.user?.uid || null);
  const [isError, setIsError] = useState(false);

  const messageRef = firestore
    .collection(`messages`)
    .doc(sessionId || 'unavailableId')
    .collection('sessionMessages');
  const query = messageRef.orderBy('createdAt').limit(25);
  const [messages, messageLoading, messageError] = useCollectionData(query, {
    idField: 'id',
  });
  const [formValue, setFormValue] = useState('');
  const [profileDetails, setProfileDetails] = useState({});
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const { t } = useTranslation('main');
  const backEndUrl =
    process.env.REACT_APP_backEndUrl || 'http://localhost:8080';
  const refOfLastMessage = useRef();

  const fetchUserInfo = () => {
    let bearer_token = Cookies.get('accessToken');
    if (!bearer_token) {
      setIsError(true);
    }
    if (userId == null) {
      return [];
    }
    return fetch(`${backEndUrl}/users/getProfile/` + userId, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + bearer_token,
      },
    }).then((response) => {
      if (response.status === 403) {
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
      setIsError(true);
    }
    return fetch(`${backEndUrl}/users/getProfilePicture/` + id, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + bearer_token,
      },
      //phone number has to be inserted properly as well on sign up
    }).then((response) => {
      if (response.status === 403) {
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
  const getUid = async (refreshEnabled = true) => {
    try {
      let result = await getUserIds();
      if (result === 'Token expired error' && refreshEnabled) {
        let tokens = await refreshTheToken();
        if (!tokens) {
          setIsError(true);
        }
        Cookies.set('accessToken', tokens.accessToken);
        Cookies.set('refreshToken', tokens.refreshToken);
        getUid(false);
      } else if (result && result.uid) {
        setUserId(result.uid);
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
    }
  };
  const fetchProfileInfoAndPicture = async (refreshEnabled = true) => {
    try {
      const result = await fetchUserInfo();
      if (result === 'Token expired error' && refreshEnabled) {
        let tokens = await refreshTheToken();
        if (!tokens) {
          setIsError(true);
        }
        Cookies.set('accessToken', tokens.accessToken);
        Cookies.set('refreshToken', tokens.refreshToken);
        fetchProfileInfoAndPicture(false);
      } else if (result.length > 0 && result[0].id) {
        const profile = {
          id: result[0].id,
          firstName: result[0].first_name,
          lastName: result[0].last_name,
          phoneNumber: result[0].phone_number,
          email: result[0].email,
          location: result[0].address,
        };

        setProfileDetails(profile);

        let profilePictureResult = await getUserPhoto(result[0].id);
        if (profilePictureResult.length > 0) {
          setProfileImageUrl(profilePictureResult[0].image_url);
        }
      }
    } catch (error) {
      // error can come from rejected Promise fetch api error or from backend API
      // console.log(error.status)
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
    }
  };
  // run  on the first render
  useEffect(fetchProfileInfoAndPicture, [userId]);
  useEffect(getUid, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (formValue === '') {
      return;
    }
    if (!profileDetails.firstName || userId == null) {
      setIsError(true);
      return;
    }
    await messageRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid: userId,
      firstName: profileDetails.firstName,
      lastName: profileDetails.lastName,
      photoURL: profileImageUrl
        ? profileImageUrl
        : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuqf58ptYjurFfvxzCIylYa9tD6s_011kbKw&usqp=CAU',
    });
    setFormValue('');
    refOfLastMessage.current.scrollIntoView({ behavior: 'smooth' });
  };

  if (!sessionId) {
    return '';
  }
  if (messageError) {
    setIsError(true);
  }

  return (
    <div className="messageBoard">
      {isError && (
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={true}
          autoHideDuration={6000}
        >
          <Alert severity={'error'}>Sorry :( Please Log back in!</Alert>
        </Snackbar>
      )}
      <Button className="messageBoard__headerButton">
        {t('session.post')}
      </Button>
      <div className="messageBoard__message__lists">
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        <div ref={refOfLastMessage}> </div>
      </div>
      <form className="messageBoard__form" onSubmit={sendMessage}>
        <input
          className="messageBoard__input"
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <SendMessageButton type="submit" variant="contained" endIcon={<Send />}>
          {t('session.send')}
        </SendMessageButton>
      </form>
    </div>
  );
};

const ChatMessage = ({ message }) => {
  const [state] = useStateValue();
  const [userId] = useState(state.user?.uid || null);
  const { text, uid, photoURL, firstName, lastName } = message;
  const messageClass = uid === userId ? 'sent' : 'received';

  return (
    <div className={`message ${messageClass}`}>
      <div className="messageImageAndName">
        <Tooltip
          key={`${firstName}  ${lastName}`}
          title={`${firstName}  ${lastName}`}
          placement={messageClass === 'sent' ? 'bottom-end' : 'bottom-start'}
          arrow
        >
          <Avatar alt={firstName} src={photoURL} />
        </Tooltip>
      </div>
      <p className="message__text"> {text} </p>
    </div>
  );
};

export default MessageBoard;
