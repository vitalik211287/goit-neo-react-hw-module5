import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <div className={css.wrapper}>
      <h1>404</h1>
      <p>Page not found</p>

      <Link to="/">Go to Home</Link>
    </div>
  );
}
