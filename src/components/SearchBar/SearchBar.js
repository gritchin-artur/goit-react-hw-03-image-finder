import css from "./SearchBar.module.css";

const SearchBar = () => (
  <header className={css.SearchBar}>
    <form className={css.form}>
      <button type="submit" className={css.button}>
        <span className={css.buttonLabel}>Search</span>
      </button>

      <input
        className={css.input}
        type="text"
        autocomplete="off"
        autofocus
        placeholder="Search images and photos"
      />
    </form>
  </header>
);

export default SearchBar;
