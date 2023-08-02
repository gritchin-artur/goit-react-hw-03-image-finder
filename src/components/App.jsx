import { Component } from "react";

import Button from "./Button/Button";
import ImageGallery from "./ImageGallery/ImageGallery";
import Loader from "./Loader/Loader";
import SearchBar from "./SearchBar/SearchBar";
import css from "./App.module.css";

export class App extends Component {
  render() {
    return (
      <div className={css.App}>
        <SearchBar />
        <Loader />
        <ImageGallery />
        <Button />
      </div>
    );
  }
}
