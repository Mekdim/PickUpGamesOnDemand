import React, { useState, useRef, useEffect } from "react";
import "../../css/MessageBoard.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Button } from "@mui/material";
import { useStateValue } from "../../StateProvider";
import Cookies, { set } from "js-cookie";
import Loader from "../Loader";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import { getUserIds, refreshTheToken } from "../logic/logic";
import { actionTypes } from "../../reducer";
const auth = firebase.auth();
const firestore = firebase.firestore();

function MessageBoard({ sessionId }) {
  const [state, dispatch] = useStateValue();
  const [userId, setUserId] = useState(
    state.user?.uid || null
  );
  const [id, setId] = useState(state.user?.id || Cookies.get("id") || null);
  const messageRef = firestore
    .collection(`messages`)
    .doc(sessionId || "unavailableId")
    .collection("sessionMessages");
  const query = messageRef.orderBy("createdAt").limit(25);
  const [messages, messageLoading, messageError] = useCollectionData(query, {
    idField: "id",
  });
  const [formValue, setFormValue] = useState("");
  const [profileDetails, setProfileDetails] = useState({});
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [backEndUrl, setBackEndUrl] = useState(process.env.REACT_APP_backEndUrl || "http://localhost:8080");
  const refOfLastMessage = useRef();
  const fetchUserInfo = ()=>{
    let bearer_token = Cookies.get('accessToken')
     if (!bearer_token){
        alert(" we couldnt get your stored sessionin  data . Please try logging in again ")
     } 
     if (userId==null){
       return []
     }
    return fetch(`${backEndUrl}/users/getProfile/` + userId, {
      method: "GET",
      headers: {
        'Content-type': 'application/json',
        "Authorization":  'Bearer ' + bearer_token
      },
      

    }).then((response) => {
      if (response.status == 403) {
        // throw the promise to catch and
        // display message from backend API
        return "Token expired error"
      }
      if (!response.ok) {
        // throw the promise to catch and
        // display message from backend API
        throw response
      }
      else
        return response.json()
    })
}
const getUserPhoto = (id)=>{
  let bearer_token = Cookies.get('accessToken')
     if (!bearer_token){
        alert(" we could get your stored sessionin  data . Please try logging in again ")
    } 
    return fetch(`${backEndUrl}/users/getProfilePicture/` + id, {
      method: "GET",
      headers: {
        'Content-type': 'application/json',
        "Authorization":  'Bearer ' + bearer_token
      },
      //phone number has to be inserted properly as well on sign up

    }).then((response) => {
      if (response.status == 403) {
        // throw the promise to catch and
        // display message from backend API
        return "Token expired error"
      }
      if (!response.ok) {
        // throw the promise to catch and
        // display message from backend API
        throw response
      }
      else
        return response.json()
    })
}
const getUid = async (refreshEnabled=true)=>{
  try {
    let result = await getUserIds()
    if (result=="Token expired error" && refreshEnabled){
      let tokens = await refreshTheToken()
      console.log("here are the tokens", tokens)
      if (!tokens){
        console.log("We couldnt get new tokens and refresh token for you. Sorry")
        return
        //alert("We couldnt get new tokens and refresh token for you. Sorry")
      }
      Cookies.set('accessToken', tokens.accessToken)
      Cookies.set('refreshToken', tokens.refreshToken)
      getUid(false)
    }
    else if (result && result.uid) {
      setUserId(result.uid)
      console.log(result)
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

  }catch(error){
    console.log(error)
    alert("Sorry, Some server error happended while fetching unique user id! Try logging in again")
      // if error comes from backend API - we can grab the mesage here or send it to logger in the future
      if (typeof error.json === "function") {
        error.json().then(error => {
          //console.log("An API error from backend API while fetching user in for userid XXX");
        }).catch(genericError => {
          //console.log("Another error ");
        });
      }
      else{
        // error status undefined here
        //console.log("some sort of fetch error happended")
      }

  }
}
const fetchProfileInfoAndPicture = async (refreshEnabled=true)=>{

    try{
      //setisLoading(true)
      let result = await fetchUserInfo()
      if (result=="Token expired error" && refreshEnabled){
        let tokens = await refreshTheToken()
        console.log("here are te tokens", tokens)
        if (!tokens){
          console.log("We couldnt get new tokens and refresh token for you. Sorry")
          return
          //alert("We couldnt get new tokens and refresh token for you. Sorry")
        }
        Cookies.set('accessToken', tokens.accessToken)
        Cookies.set('refreshToken', tokens.refreshToken)
        fetchProfileInfoAndPicture(false)
      }
      else if (result.length > 0 && result[0].id) {
        const profile =
        {
          "id": result[0].id,
          "firstName": result[0].first_name,
          "lastName": result[0].last_name,
          "phoneNumber": result[0].phone_number,
          "email": result[0].email,
          "location": result[0].address
        }
       
        setProfileDetails(profile)
        
        let profilePictureResult = await getUserPhoto(result[0].id)
        if (profilePictureResult.length > 0) {
          setProfileImageUrl(profilePictureResult[0].image_url)
        }
      }
      
      
    }catch(error){
      
      // error can come from rejected Promise fetch api error or from backend API
      // console.log(error.status) 
      alert("Sorry, Some server error happended while fetching profile details!")
      // if error comes from backend API - we can grab the mesage here or send it to logger in the future
      if (typeof error.json === "function") {
        error.json().then(error => {
          //console.log("An API error from backend API while fetching user in for userid XXX");
        }).catch(genericError => {
          //console.log("Another error ");
        });
      }
      else{
        // error status undefined here
        //console.log("some sort of fetch error happended")
      }
    }
    
}
  // run  on the first render
  useEffect(fetchProfileInfoAndPicture, [userId]);
  useEffect(getUid, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    //const [uxid, photoURL] = auth.currentUser
    if (formValue == "") {
      alert("Please Enter a text message before you send!");
      return;
    }
    if (!profileDetails.firstName || userId==null) {
      alert(
        "Some Error happened sending your message. We couldnt grab your first name, last name or unique id. Try refreshing again! "
      );
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
        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuqf58ptYjurFfvxzCIylYa9tD6s_011kbKw&usqp=CAU",
    });
    setFormValue("");
    refOfLastMessage.current.scrollIntoView({ behavior: "smooth" });
  };
  if (!sessionId) {
    return "";
  }
  if (messageError) {
    alert(
      "sorry we couldnt fetch the messages for this session. Try refreshing."
    );
  }
  return (
    <div className="messageBoard">
      <Button className="messageBoard__headerButton">
        Post your messages here
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
        <button className="messageBoard__button" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}
function ChatMessage({ message }) {
  const [state] = useStateValue();
  const [userId] = useState(state.user?.uid || null);
  // const [id, setId] = useState(state.user?.id || Cookies.get("id") || null);
  const { text, uid, photoURL, firstName, lastName } = message;
  const messageClass = uid === userId ? "sent" : "received";

  return (
    <div className={`message ${messageClass}`}>
      <div className="messageImageAndName">
        <Tooltip
          key={`${firstName}  ${lastName}`}
          title={`${firstName}  ${lastName}`}
          placement={messageClass === "sent" ? "bottom-end" : "bottom-start"}
          arrow
        >
          <Avatar alt={firstName} src={photoURL} />
        </Tooltip>
      </div>
      <p className="message__text"> {text} </p>
    </div>
  );
}

export default MessageBoard;
