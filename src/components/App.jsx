import { Component } from "react";
import { Notify } from "notiflix/build/notiflix-notify-aio";

import Button from "./Button/Button";
import ImageGallery from "./ImageGallery/ImageGallery";
import Loader from "./Loader/Loader";
import SearchBar from "./SearchBar/SearchBar";
import Modal from "./Modal/Modal";

import fetchApi from "./fetch";
import { GlobalStyled } from "./createGlobalStyle/createGlobalStyle";

export class App extends Component {
  state = {
    seachTopic: "",
    images: [],
    page: 1,
    selectedImage: null,
    alt: null,
    status: "idle",
    error: null,
    showModal: false,
  };

  async componentDidUpdate(_, prevState) {
    const { page, topic } = this.state;
    if (prevState.topic !== topic || prevState.page !== page) {
      this.setState({ status: "pending" });

      const imagesHits = (await fetchApi(topic, page)).hits;

      if (!imagesHits.length) {
        Notify.failure(
          "No results were found for your search, please try something else."
        );
      }
      this.setState(({ images }) => ({
        images: [...images, ...imagesHits],
        status: "resolved",
      }));
    }
  }

  handleFormSubmit = (topic) => {
    this.setState({
      seachTopic: "",
      page: 1,
      images: [],
      selectedImage: null,
      alt: null,
      status: "idle",
      showModal: false,
    });
    this.setState({ topic });
  };

  // modal imag
  handleSelectedImage = (largeImageUrl, tags) => {
    this.setState({
      selectedImage: largeImageUrl,
      alt: tags,
      showModal: true,
    });
  };

  // click button load more
  loadMore = () => {
    this.setState((e) => ({
      page: e.page + 1,
    }));
  };

  // click button close modal
  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };

  //seach topic images
  handleChange = (e) => {
    this.setState({ seachTopic: e.currentTarget.value.toLowerCase() });
  };
  handleSubmit = (e) => {
    const { seachTopic } = this.state;
    e.preventDefault();
    if (seachTopic.trim() === "") {
      Notify.failure("Please enter what do you find");
      return;
    }
    this.handleFormSubmit(seachTopic);
  };

  render() {
    const {
      images,
      status,
      selectedImage,
      alt,
      error,
      seachTopic,
      showModal,
    } = this.state;
    return (
      <>
        <SearchBar
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          value={seachTopic}
        />
        {status === "pending" && <Loader />}
        {error && (
          <h1 style={{ color: "orangered", textAlign: "center" }}>
            {error.message}
          </h1>
        )}
        {images.length > 0 && (
          <ImageGallery
            images={images}
            selectedImage={this.handleSelectedImage}
          />
        )}
        {images.length > 0 && images.length !== this.totalHits && (
          <Button onClick={this.loadMore} />
        )}
        {showModal && (
          <Modal
            selectedImage={selectedImage}
            tags={alt}
            onClose={this.closeModal}
          />
        )}
        <GlobalStyled />
      </>
    );
  }
}
