import useSWR from 'swr';

const fetcher = (url) =>
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
  }).then((r) => {
    if (!r.ok) {
      throw new Error('Unable to find session data');
    }
    return r.json();
  });

const useSessionData = (sessionId) => {
  let backEndUrl = process.env.REACT_APP_backEndUrl || 'http://localhost:8080';
  const { data, error } = useSWR(
    `${backEndUrl}/pitch/sessions/${sessionId}`,
    fetcher
  );
  return {
    sessionData: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useSessionData;
