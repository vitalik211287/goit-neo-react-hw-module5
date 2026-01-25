import { Link, useLocation } from "react-router-dom";

function MovieItem({ movie }) {
  const location = useLocation();
  return (
    <li>
      <Link
        to={`/movies/${movie.id}`}
        state={{ from: location.pathname + location.search }}
      >
        {movie.title}
      </Link>
    </li>
  );
}

export default MovieItem;
