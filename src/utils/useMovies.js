import { useState, useEffect } from "react";
import setTimer from "./helpers";

const KEY = "Your omdbapi key";

export function useMovies(query, callBack) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(
    function () {
      const controller = new AbortController();

      callBack?.();

      async function getMovieData() {
        try {
          setIsLoading(true);
          setError("");

          const fetchPro = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          const res = await Promise.race([fetchPro, setTimer(10)]);

          if (!res.ok)
            throw new Error("Something went wrong fetching movies data.");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");
          setMovies(data.Search);

          setError("");
        } catch (error) {
          if (error.name !== "AbortError") {
            setError(error.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        setIsLoading(false);
        return;
      }

      // handleCloseMovie();
      getMovieData();

      return function () {
        controller.abort();
      };
    },
    [query, callBack]
    // []
  );

  return [movies, isLoading, error];
}
