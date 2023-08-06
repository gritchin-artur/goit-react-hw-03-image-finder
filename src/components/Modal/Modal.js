import { Div, DivModal } from "./Modal.styled";
import { Component } from "react";
import propTypes from "prop-types";

const preventScroll = (e) => {
  e.preventDefault();
};
export default class Modal extends Component {
  static propTypes = {
    selectedImage: propTypes.string.isRequired,
    tags: propTypes.string.isRequired,
    onClose: propTypes.func.isRequired,
  };
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
    window.removeEventListener("wheel", preventScroll);
    window.removeEventListener("touchmove", preventScroll);
  }

  handleKeyDown = (e) => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };

  handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };
  render() {
    const { selectedImage, tags } = this.props;

    return (
      <Div onClick={this.handleBackdropClick}>
        <DivModal>
          <img src={selectedImage} alt={tags} />
        </DivModal>
      </Div>
    );
  }
}
