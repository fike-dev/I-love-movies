import { useEffect, useState } from "react";

import { useMovies } from "./utils/useMovies.js";
import { useLocalStorageState } from "./utils/useLocalStorageState.js";

import Loader from "./ui/Loader.js";
import ErrorMessage from "./ui/ErrorMessage.js";
import Box from "./ui/Box.js";
import Search from "./ui/Search.js";
import Main from "./ui/Main.js";
import Navigation from "./ui/Navigation.js";

import MoviesList from "./movies/movies/MoviesList.js";
import MovieDetails from "./movies/movies/MovieDetails.js";
import WatchedMoviesList from "./movies/wachedMovies/WatchedMoviesList.js";
import WatchedMoviesSummary from "./movies/wachedMovies/WatchedMoviesSummary.js";
import NumResults from "./movies/movies/NumResults.js";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, isLoading, error] = useMovies(query);

  const [watched, setWatched] = useLocalStorageState([], "watched");
  const [selectedId, setSelectedId] = useState(null);

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleWatchedMovie(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(watched));
    },
    [watched]
  );

  return (
    <>
      <Navigation>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navigation>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MoviesList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onSetWatched={handleWatchedMovie}
              watchedMovies={watched}
            />
          ) : (
            <>
              <WatchedMoviesSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
                onSelectMovie={handleSelectMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
