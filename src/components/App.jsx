import {  Routes, Route } from "react-router";
import { Toaster } from "react-hot-toast";
import HomePage from "../pages/HomePage/HomePage.jsx";
import MoviesPage from "../pages/MoviesPage/MoviesPage.jsx";
import MoviesDetails from "../pages/MovieDetailsPage/MovieDetailsPage.jsx";
// import Navigate from "./Navigation/Navigate.jsx";
import Layout from "./Layout/Layout.jsx";
import "./App.css";

function App() {
    return (
      <div className="container">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
             <Route path="movies" element={<MoviesPage />} />
             <Route path="/movies/:movieId" element={<MoviesDetails />}>
              {/* <Route path="/movies/:movieId/cast" element={<Cast />} />
              <Route path="/movies/:movieId/reviews" element={<Reviews />} /> */}
            </Route> 
            {/* <Route path="*" element={<Navigate to="/" />} /> */}
          </Route>
        </Routes>
        <Toaster position="top-right" />
      </div>
    );
}

export default App;
