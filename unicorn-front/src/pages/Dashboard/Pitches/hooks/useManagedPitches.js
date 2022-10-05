import useSWR from 'swr';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';

const fetcher = (url, token) =>
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  }).then((r) => {
    if (!r.ok) {
      throw new Error('unable to find pitches for this host');
    }
    return r.json();
  });

const useManagedPitches = () => {
  const history = useHistory();
  const hostId = Cookies.get('id');
  const token = Cookies.get('accessToken');

  if (!hostId || !token) {
    // user needs to logIn or signUp
    history.push('/signin');
  }

  const backEndUrl =
    process.env.REACT_APP_backEndUrl || 'http://localhost:8080';
  const url = `${backEndUrl}/pitch/host/${hostId}`;
  const { data, error } = useSWR(`managedPitches`, () => fetcher(url, token));
  return {
    pitches: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useManagedPitches;
