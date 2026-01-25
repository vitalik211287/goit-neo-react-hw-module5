import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import MovieSearchForm from "../../components/MovieSearchForm/MovieSearchForm";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";

import { getSearchMovies } from "../../services/ApiService";


export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  const handleSubmit = (value) => {

    // setMovies([]);

    setSearchParams(value ? { query: value } : {});
  };

  useEffect(() => {
    if (!query) return;

    async function fetchMovies() {
      try {
        setLoading(true);
        setError(null);

        const results = await getSearchMovies(query);
        setMovies(results || []);
      } catch (err) {
        setError(err.message || "Search failed");
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [query]);

  return (
    <div>
      <MovieSearchForm onSubmit={handleSubmit} />

      {loading && <Loader />}

      {error && <p>Error: {error}</p>}

      {movies.length > 0 && <MovieList movies={movies} />}

      {!loading && query && movies.length === 0 && !error && (
        <p>No movies found.</p>
      )}
    </div>
  );
}
