import { Link } from "react-router-dom";

function MovieItem({ movie }) {
    console.log(movie);
    console.log(movie.title);
  return (
    <li>
      <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
    </li>
  );
}

export default MovieItem;
