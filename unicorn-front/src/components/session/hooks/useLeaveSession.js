export const leaveSession = (sessionId, playerId) => {
  let backEndUrl = process.env.REACT_APP_backEndUrl || 'http://localhost:8080';
  let url = `${backEndUrl}/pitch/leaveSession`;
  let body = { sessionId: sessionId, playerId: playerId };
  return fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then((res) => {
    if (!res.ok) {
      const error = new Error('An error occurred while fetching the data.');
      error.status = res.status;
      throw error;
    }
    return res.json();
  });
};

export const fetchSessionPlayers = ({ sessionId }) => {
  let backEndUrl = process.env.REACT_APP_backEndUrl || 'http://localhost:8080';
  return fetch(`${backEndUrl}/pitch/${sessionId}/players`, {
    method: 'GET',
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(
          'Sorry! We are not able to fetch list of session players for you at the moment. Try again later'
        );
      }
      return res.json();
    })
    .then((values) => {
      return values;
    });
};

export const deleteSession = ({ sessionId, playerId }) => {
  let body = { playerId: playerId };
  let backEndUrl = process.env.REACT_APP_backEndUrl || 'http://localhost:8080';
  return fetch(`${backEndUrl}/pitch/deleteSession/${sessionId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Sorry! Unable to delete session. Try again later');
      }
      return res.json();
    })
    .then((values) => {
      return values;
    });
};
