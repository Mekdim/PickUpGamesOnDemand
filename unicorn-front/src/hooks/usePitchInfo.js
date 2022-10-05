import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((r) => r.json());

const usePitchInfo = (id) => {
  let backEndUrl = process.env.REACT_APP_backEndUrl || 'http://localhost:8080';
  const { data, error } = useSWR(
    `${backEndUrl}/pitch/pitchData/${id}`,
    fetcher
  );
  return {
    pitch: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default usePitchInfo;
