export const leaveSession = (url, sessionId, playerId) => {
  let body = { sessionId: sessionId, playerId: playerId };
  return fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then((res) => {
    if (!res.ok) {
      const error = new Error("An error occurred while fetching the data.");
      error.status = res.status;
      throw error;
    }
    return res.json();
  });
};
