import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../services/ApiService.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import MovieList from "../../components/MovieList/MovieList.jsx";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      try {
        const movies = await getTrendingMovies();
        setMovies(movies);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

return (
  <div>
    <h1>Trending movies</h1>

    {loading && <Loader />}
    {movies.length > 0 && <MovieList movies={movies} />}
  </div>
);

}

export default HomePage;
