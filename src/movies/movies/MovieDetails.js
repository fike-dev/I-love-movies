import { useEffect, useRef, useState } from "react";
import { useKey } from "../../utils/useKey";
import Loader from "../../ui/Loader";
import Button from "../../ui/Button";
import StarRating from "../../utils/StarRating";

const KEY = process.env.REACT_APP_OMDB_API_KEY;

export default function MovieDetails({
  selectedId,
  onCloseMovie,
  onSetWatched,
  watchedMovies,
}) {
  const [movie, setMovie] = useState({});
  const [movieRating, setMovieRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const countRating = useRef(0);

  useEffect(
    function () {
      if (movieRating) countRating.current++;
    },
    [movieRating]
  );

  const isWatched = watchedMovies
    .map((movie) => movie.imdbID)
    .includes(selectedId);
  const watchedUserRating = watchedMovies.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
    // userRating: movieRating,
  } = movie;

  function handleAddWatched() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      userRating: movieRating,
      runtime: Number(runtime.split(" ").at(0)),
      countRatingDecisions: countRating.current,
    };
    onSetWatched(newWatchedMovie);
    onCloseMovie();
  }

  useKey("Escape", onCloseMovie);

  useEffect(
    function () {
      async function getMovieDetails() {
        try {
          setIsLoading(true);

          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
          );
          if (!res.ok) throw new Error("Smothing went wrong!");

          const data = await res.json();

          setMovie(data);
        } catch (err) {
          console.log(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      getMovieDetails();
    },
    [selectedId]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <Button className="btn-back" onClick={() => onCloseMovie()}>
              &larr;
            </Button>
            <img src={poster} alt={`Poster of ${title}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre} </p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDB rating
              </p>
            </div>
          </header>
          {/* <p>{avgRating} </p> */}
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    defaultRating={movieRating}
                    onSetRating={setMovieRating}
                  />
                  {movieRating > 0 && (
                    <Button className="btn-add" onClick={handleAddWatched}>
                      + Add to list
                    </Button>
                  )}
                </>
              ) : (
                <p>
                  You rated this movie {watchedUserRating} <span>⭐</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot} </em>
            </p>
            <p>Starring {actors} </p>
            <p>Directed by {director} </p>
            <p>This movie was rated {movieRating} </p>
          </section>
        </>
      )}
    </div>
  );
}
