import Cookies from "js-cookie";
export const fetchNotification = (playerId) => {
  return fetch(`http://localhost:8080/users/notifications/${playerId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Not able to fetch notifications. Try again later");
    }
    return res.json();
  });
};

export const getUserProfile = (userUId) => {
  let bearer_token = Cookies.get("accessToken");
  if (!bearer_token) {
    alert(
      " we could get your stored sessionin  data . Please try logging in again "
    );
  }
  return fetch("http://localhost:8080/users/getProfile/" + userUId, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + bearer_token,
    },
    // Mark: phone number has to be inserted properly as well on sign up
  }).then((response) => {
    if (!response.ok) {
      // throw the promise to catch and
      // display message from backend API
      throw response;
    } else return response.json();
  });
};

export const logOutUser = () => {
  let access_token = Cookies.get("accessToken");
  return fetch("http://localhost:8080/tokens/logout", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
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
  let refresh_token = Cookies.get("refreshToken");
  return fetch("http://localhost:8080/tokens/refreshTheToken", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
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
  return fetch("http://localhost:8080/tokens/login/", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
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
  return fetch(
    "http://localhost:8080/users/notifications/update/" + notificationId,
    {
      method: "PUT",
    }
  ).then((response) => {
    if (!response.ok) {
      throw response;
    } else return response.json();
  });
};

export const clearAllNotifications = (notifications) => {
  let body = { ids: notifications };
  return fetch("http://localhost:8080/users/notifications/update", {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((response) => {
    if (!response.ok) {
      throw response;
    } else return response.json();
  });
};
