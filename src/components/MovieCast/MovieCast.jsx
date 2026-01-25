import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieActors } from "../../services/ApiService";
import css from "./MovieCast.module.css";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w200";
const NO_PHOTO = "https://via.placeholder.com/200x300?text=No+Photo";

export default function MovieCast() {
  const { movieId } = useParams();

  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    async function fetchCast() {
      try {
        setLoading(true);
        setError(null);

        const data = await getMovieActors(movieId);
        const castArr = Array.isArray(data?.cast) ? data.cast : data;

        setCast(castArr || []);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchCast();
  }, [movieId]);

  if (loading) return <p className={css.info}>Loading cast...</p>;
  if (error) return <p className={css.error}>Error: {error}</p>;

  if (!cast || cast.length === 0) {
    return <p className={css.info}>We don't have any cast for this movie.</p>;
  }

  return (
    <ul className={css.list}>
      {cast.map(({ id, name, character, profile_path }) => {
        const imgUrl = profile_path
          ? `${IMAGE_BASE_URL}${profile_path}`
          : NO_PHOTO;

        return (
          <li key={id} className={css.item}>
            <img className={css.img} src={imgUrl} alt={name} />
            <p className={css.name}>{name || "No information"}</p>
            <p className={css.character}>
              Character: {character || "No information"}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
