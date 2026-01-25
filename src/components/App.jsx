import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";

import Layout from "./Layout/Layout.jsx";
import Loader from "../components/Loader/Loader.jsx";

import "./App.css";


const HomePage = lazy(() => import("../pages/HomePage/HomePage.jsx"));
const MoviesPage = lazy(() => import("../pages/MoviesPage/MoviesPage.jsx"));
const MoviesDetails = lazy(
  () => import("../pages/MovieDetailsPage/MovieDetailsPage.jsx"),
);
const NotFoundPage = lazy(
  () => import("../pages/NotFoundPage/NotFoundPage.jsx"),
);


const MovieCast = lazy(() => import("../components/MovieCast/MovieCast.jsx"));
const MovieReviews = lazy(
  () => import("../components/MovieReviews/MovieReviews.jsx"),
);

function App() {
  return (
    <div className="container">
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />

            <Route path="movies" element={<MoviesPage />} />

            <Route path="movies/:movieId" element={<MoviesDetails />}>
              <Route path="cast" element={<MovieCast />} />
              <Route path="reviews" element={<MovieReviews />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>

      <Toaster position="top-right" />
    </div>
  );
}

export default App;
