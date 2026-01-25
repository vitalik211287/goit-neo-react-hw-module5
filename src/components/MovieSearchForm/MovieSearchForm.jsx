import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";
import { toast } from "react-hot-toast";
import css from "./MovieSearchForm.module.css";

function MovieSearchForm({ onSubmit }) {
  const [pageName, setPageName] = useState("");

  const handleInputChange = (e) => {
    setPageName(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!pageName.trim()) {
      toast.error("Search field is empty!");
      return;
    }

    onSubmit(pageName);
    setPageName("");
  };

  return (
    <div className={css.divSearch}>
      <form onSubmit={handleSubmit} className={css.formSearch}>
        <button type="submit" className={css.buttonSearch}>
          <AiOutlineSearch size={26} />
        </button>

        <input
          value={pageName}
          type="text"
          className={css.inputSearch}
          autoComplete="off"
          onChange={handleInputChange}
          placeholder="Search movies..."
        />
      </form>
    </div>
  );
}

export default MovieSearchForm;
