import MovieItem from "../MovieItem.jsx";

function MovieList({ movies }) {
  {
    return (
      <ul>
        {movies.map((movie) => (
          <MovieItem key={movie.id} movie={movie} />
        ))}
      </ul>
    );
  }
}
export default MovieList;
