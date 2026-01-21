import axios from "axios";

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
  params: {
    language: "en-US",
  },
});

// Trending
export async function getTrendingMovies() {
  const { data } = await tmdb.get("/trending/movie/day");
  return data.results;
}

// Search
export async function getSearchMovies(query) {
  const { data } = await tmdb.get("/search/movie", {
    params: { query, include_adult: false, page: 1 },
  });
  return data.results;
}

// Details
export async function getMovieById(id) {
  const { data } = await tmdb.get(`/movie/${id}`);
  return data;
}

// Credits (actors)
export async function getMovieActors(id) {
  const { data } = await tmdb.get(`/movie/${id}/credits`);
  return data.cast; // зручно одразу cast
}

// Reviews
export async function getMovieReviews(id) {
  const { data } = await tmdb.get(`/movie/${id}/reviews`);
  return data.results; // зручно одразу results
}

console.log("TMDB TOKEN:", import.meta.env.VITE_TMDB_TOKEN);