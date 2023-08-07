import { Component } from "react";
import { Notify } from "notiflix/build/notiflix-notify-aio";

import Button from "./Button/Button";
import ImageGallery from "./ImageGallery/ImageGallery";
import Loader from "./Loader/Loader";
import SearchBar from "./SearchBar/SearchBar";
import Modal from "./Modal/Modal";

import fetchApi from "./fetch/fetch";
import { GlobalStyled } from "./createGlobalStyle/createGlobalStyle";

export class App extends Component {
  state = {
    topic: "",
    images: [],
    page: 1,
    totalHits: 0,
    status: "idle",
    error: null,
    selectedImage: "",
    alt: "",
    showModal: false,
  };

  async componentDidUpdate(_, prevState) {
    const { page, topic } = this.state;
    if (prevState.topic !== topic || prevState.page !== page) {
      this.setState({ status: "pending" });
      try {
        const { hits: imagesHits, total: totalHits } = await fetchApi(
          topic,
          page
        );

        if (!imagesHits.length) {
          Notify.failure(
            "No results were found for your search, please try something else."
          );
        }
        this.setState(({ images }) => ({
          images: [...images, ...imagesHits],
          status: "resolved",
          totalHits,
        }));
      } catch (error) {
        this.setState({
          status: "rejected",
          error: "Something went wrong",
        });
      }
    }
  }

  // click to button seach
  handleFormSubmit = (topic) => {
    this.setState({
      topic,
      page: 1,
      images: [],
    });
  };

  // click button load more
  loadMore = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };

  // modal imag
  handleSelectedImage = (largeImageUrl, tags) => {
    this.setState({
      selectedImage: largeImageUrl,
      alt: tags,
      showModal: true,
    });
  };

  // click button close modal
  closeModal = () => {
    this.setState({
      selectedImage: "",
      alt: "",
      showModal: false,
    });
  };

  render() {
    const {
      images,
      status,
      selectedImage,
      alt,
      error,
      showModal,
      totalHits,
    } = this.state;
    return (
      <>
        <SearchBar onSubmit={this.handleFormSubmit} />
        {status === "pending" && <Loader />}
        {error && (
          <h1 style={{ color: "orangered", textAlign: "center" }}>{error}</h1>
        )}
        {images.length > 0 && (
          <ImageGallery
            images={images}
            selectedImage={this.handleSelectedImage}
          />
        )}
        {images.length !== totalHits && status === "resolved" && (
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
