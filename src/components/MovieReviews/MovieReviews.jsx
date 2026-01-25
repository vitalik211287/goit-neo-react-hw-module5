import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import css from "./MovieReviews.module.css";
import Loader from "../../components/Loader/Loader";
import { getMovieReviews } from "../../services/ApiService";


const MovieReviews = () => {
  const { movieId } = useParams();

  const [reviews, setReviews] = useState([]); // масив
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    async function fetchReviews() {
      try {
        setLoading(true);
        setError(null);

        const data = await getMovieReviews(movieId); // тут уже results
        setReviews(data || []);
      } catch (err) {
        setError(err.message || "Failed to load reviews");
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, [movieId]);

  if (loading) return <Loader />;

  if (error) return <p className={css.error}>Error: {error}</p>;

  if (reviews.length === 0) {
    return (
      <p className={css.empty}>We don't have any reviews for this movie.</p>
    );
  }

  return (
    <ul className={css.list}>
      {reviews.map(({ id, author, content }) => (
        <li key={id} className={css.item}>
          <p className={css.author}>
            <span className={css.authorTitle}>Author:</span>{" "}
            {author || "No information"}
          </p>
          <p className={css.content}>{content || "No information"}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieReviews;
