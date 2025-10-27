import Button from "../../ui/Button";

export default function WatchedMovie({
  movie,
  onDeleteWatched,
  onSelectMovie,
}) {
  return (
    <li
      key={movie.imdbID}
      onClick={(e) => {
        if (![...document.querySelectorAll(".btn-delete")].includes(e.target)) {
          onSelectMovie(movie.imdbID);
        }
      }}
    >
      <Button
        className="btn-delete"
        onClick={() => onDeleteWatched(movie.imdbID)}
      >
        &times;
      </Button>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  );
}
