import useSWR from "swr";

const fetcher = (url) =>
  fetch(url, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  }).then((r) => r.json());

const usePitches = () => {
  let backEndUrl = process.env.REACT_APP_backEndUrl || "http://localhost:8080";
  const { data, error } = useSWR(
    `${backEndUrl}/pitch/pitches`,
    fetcher
  );
  return {
    pitches: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default usePitches;
