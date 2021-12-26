import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

const usePitchData = (id) => {
  let backEndUrl = process.env.backEndUrl || "http://localhost:8080";
  const { data, error } = useSWR(`${backEndUrl}/pitch/${id}`, fetcher);
  return {
    pitch: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default usePitchData;
