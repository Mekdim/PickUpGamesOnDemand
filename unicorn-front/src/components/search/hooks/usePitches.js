import useSWR from "swr";

const fetcher = (url) =>
  fetch(url, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  }).then((r) => r.json());

const usePitches = () => {
  const { data, error } = useSWR(
    "http://localhost:8080/pitch/pitches",
    fetcher
  );
  return {
    pitches: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default usePitches;
