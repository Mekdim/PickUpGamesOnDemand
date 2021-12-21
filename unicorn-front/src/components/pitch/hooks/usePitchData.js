import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

const usePitchData = (id) => {
  const { data, error } = useSWR(`http://localhost:8080/pitch/${id}`, fetcher);
  return {
    pitch: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default usePitchData;
