import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((r) => r.json());

const useOpeningHours = (id) => {
  let backEndUrl = process.env.REACT_APP_backEndUrl || 'http://localhost:8080';
  const { data, error } = useSWR(
    `${backEndUrl}/pitch/${id}/openingHours`,
    fetcher
  );
  return {
    hours: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useOpeningHours;
