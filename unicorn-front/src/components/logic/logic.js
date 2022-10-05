import Cookies from 'js-cookie';

export const fetchNotification = (playerId) => {
  let backEndUrl = process.env.REACT_APP_backEndUrl || 'http://localhost:8080';
  return fetch(`${backEndUrl}/users/notifications/${playerId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error('Not able to fetch notifications. Try again later');
    }
    return res.json();
  });
};

export const getUserProfile = (userUId) => {
  let bearer_token = Cookies.get('accessToken');
  if (!bearer_token) {
    alert(
      ' we could get your stored sessionin  data . Please try logging in again '
    );
  }
  let backEndUrl = process.env.REACT_APP_backEndUrl || 'http://localhost:8080';
  return fetch(`${backEndUrl}/users/getProfile/` + userUId, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + bearer_token,
    },
    // Mark: phone number has to be inserted properly as well on sign up
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

export const getUserIds = () => {
  const bearer_token = Cookies.get('accessToken');
  const backEndUrl =
    process.env.REACT_APP_backEndUrl || 'http://localhost:8080';
  return fetch(`${backEndUrl}/users/getUserIds/`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + bearer_token,
    },
    // Mark: phone number has to be inserted properly as well on sign up
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

export const logOutUser = () => {
  let access_token = Cookies.get('accessToken');
  let backEndUrl = process.env.REACT_APP_backEndUrl || 'http://localhost:8080';
  return fetch(`${backEndUrl}/tokens/logout`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      accessToken: access_token,
    }),
    // Mark: phone number has to be inserted properly as well on sign up
  }).then((response) => {
    if (!response.ok) {
      // throw the promise to catch and
      // display message from backend API
      throw response;
    } else return response.json();
  });
};

export const refreshTheToken = () => {
  let refresh_token = Cookies.get('refreshToken');
  let backEndUrl = process.env.REACT_APP_backEndUrl || 'http://localhost:8080';
  return fetch(`${backEndUrl}/tokens/refreshTheToken`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      refreshToken: refresh_token,
    }),
    // Mark: phone number has to be inserted properly as well on sign up
  }).then((response) => {
    if (!response.ok) {
      // throw the promise to catch and
      // display message from backend API
      throw response;
    } else return response.json();
  });
};

export const getTokensOnLogin = (userUId) => {
  let backEndUrl = process.env.REACT_APP_backEndUrl || 'http://localhost:8080';
  return fetch(`${backEndUrl}/tokens/login/`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      uid: userUId,
    }),
    // Mark: phone number has to be inserted properly as well on sign up
  }).then((response) => {
    if (!response.ok) {
      // throw the promise to catch and
      // display message from backend API
      throw response;
    } else return response.json();
  });
};

export const clearNotification = (notificationId) => {
  let backEndUrl = process.env.REACT_APP_backEndUrl || 'http://localhost:8080';
  return fetch(`${backEndUrl}/users/notifications/update/${notificationId}`, {
    method: 'PUT',
  }).then((response) => {
    if (!response.ok) {
      throw response;
    } else return response.json();
  });
};

export const clearAllNotifications = (notifications) => {
  let backEndUrl = process.env.REACT_APP_backEndUrl || 'http://localhost:8080';
  let body = { ids: notifications };
  return fetch(`${backEndUrl}/users/notifications/update`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((response) => {
    if (!response.ok) {
      throw response;
    } else return response.json();
  });
};
export const confirmInvitationCode = (invitationcode) => {
  let backEndUrl = process.env.REACT_APP_backEndUrl || 'http://localhost:8080';
  return fetch(`${backEndUrl}/users/confirmInvitationCode`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      invitationcode: invitationcode,
    }),
    // Mark: phone number has to be inserted properly as well on sign up
  }).then((response) => {
    if (!response.ok) {
      // throw the promise to catch and
      // display message from backend API
      throw response;
    } else return response.json();
  });
};
export const addInvitationCode = (invitationcode, type, id) => {
  let backEndUrl = process.env.REACT_APP_backEndUrl || 'http://localhost:8080';
  return fetch(`${backEndUrl}/users/saveInvitationCode`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      invitationcode: invitationcode,
      type: type,
      id: id,
    }),
    // Mark: phone number has to be inserted properly as well on sign up
  }).then((response) => {
    if (!response.ok) {
      // throw the promise to catch and
      // display message from backend API
      throw response;
    } else return response.json();
  });
};
export const logErrors = (error) => {
  let backEndUrl = process.env.REACT_APP_backEndUrl || 'http://localhost:8080';
  return fetch(`${backEndUrl}/log/error`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      error: error,
    }),
    // Mark: phone number has to be inserted properly as well on sign up
  }).then((response) => {
    if (!response.ok) {
      // throw the promise to catch and
      // display message from backend API
      throw response;
    } else return response.json();
  });
};
