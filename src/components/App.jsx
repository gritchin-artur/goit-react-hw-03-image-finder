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
    seachTopic: "",
    images: [],
    page: 1,
  };
  totalHits = 0;

  async componentDidUpdate(_, prevState) {
    const { page, topic } = this.state;
    if (prevState.topic !== topic || prevState.page !== page) {
      this.setState({ status: "pending" });
      try {
        const imageData = await fetchApi(topic, page);
        const imagesHits = imageData.hits;
        this.totalHits = imageData.total;

        if (!imagesHits.length) {
          Notify.failure(
            "No results were found for your search, please try something else."
          );
        }
        this.setState(({ images }) => ({
          images: [...images, ...imagesHits],
          status: "resolved",
        }));
      } catch (error) {
        this.setState({
          status: "error message",
        });
      }
    }
  }

  // click to button seach
  handleFormSubmit = (topic) => {
    this.setState({
      seachTopic: topic,
      page: 1,
      images: [],
      topic,
    });
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
    this.setState((prevState) => ({
      page: prevState.page + 1,
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
        {images.length !== this.totalHits && status === "resolved" && (
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
