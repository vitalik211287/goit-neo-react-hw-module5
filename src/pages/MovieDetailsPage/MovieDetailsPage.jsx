import { useEffect, useRef, useState } from "react";
import {
  NavLink,
  Outlet,
  Link,
  useLocation,
  useParams,
} from "react-router-dom";
import { getMovieById } from "../../services/ApiService";
import Loader from "../../components/Loader/Loader";
import css from "./MovieDetailsPage.module.css";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const NO_IMG = "https://via.placeholder.com/500x750?text=No+Image";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();

  const backLinkRef = useRef(location.state?.from ?? "/movies");

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    async function fetchMovie() {
      try {
        setLoading(true);
        setError(null);

        const data = await getMovieById(movieId);
        setMovie(data);
      } catch (err) {
        setError(err.message || "Failed to load movie details");
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [movieId]);

  if (loading) return <Loader />;
  if (error) return <p className={css.error}>Error: {error}</p>;
  if (!movie) return null;

  const { poster_path, title, release_date, vote_average, overview, genres } =
    movie;

  const imgUrl = poster_path ? `${IMAGE_BASE_URL}${poster_path}` : NO_IMG;
  const year = release_date ? release_date.slice(0, 4) : "N/A";
  const score = vote_average ? Math.round(vote_average * 10) : null;
  const genresStr = genres?.length ? genres.map((g) => g.name).join(", ") : "";

  return (
    <div className={css.wrapper}>
      <Link className={css.backLink} to={backLinkRef.current}>
        ← Go back
      </Link>

      <div className={css.details}>
        <img className={css.poster} src={imgUrl} alt={title} />

        <div className={css.info}>
          <h1 className={css.title}>
            {title} ({year})
          </h1>

          <p className={css.text}>
            <span className={css.label}>User score:</span>{" "}
            {score !== null ? `${score}%` : "No information"}
          </p>

          <p className={css.text}>
            <span className={css.label}>Overview:</span>{" "}
            {overview || "No information"}
          </p>

          <p className={css.text}>
            <span className={css.label}>Genres:</span>{" "}
            {genresStr || "No information"}
          </p>
        </div>
      </div>

      <p className={css.additional}>Additional information</p>

      <ul className={css.links}>
        <li>
          <NavLink
            to="cast"
            className={({ isActive }) =>
              isActive ? `${css.link} ${css.active}` : css.link
            }
          >
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink className={css.link} to="reviews">
            Reviews
          </NavLink>
        </li>
      </ul>

      <Outlet />
    </div>
  );
}
