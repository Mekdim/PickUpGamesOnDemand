import useSWRImmutable from 'swr/immutable';

const fetcher = (url) => {
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
  }).then((r) => {
    if (!r.ok) {
      throw new Error('Not able to fetch opening hours');
    }
    return r.json();
  });
};

const useOpeningHours = (pitchId, date) => {
  let backEndUrl = process.env.REACT_APP_backEndUrl || 'http://localhost:8080';
  const { data, error } = useSWRImmutable(
    `${backEndUrl}/pitch/${pitchId}/${date}/openingHours`,
    fetcher
  );
  return {
    hours: data,
    isLoadingHours: !error && !data,
    isErrorHours: error,
  };
};

export default useOpeningHours;
