import Navigation from "../Navigation/Navigation";
import { Outlet } from "react-router-dom";
import css from "./Layout.module.css";

export default function Layout() {
  return (
    <>
      <header className={css.header}>
        <Navigation />
      </header>

      <Outlet />
    </>
  );
}
