import { Ul } from "./ImageGallery.styled";

import propTypes from "prop-types";
import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";

const ImageGallery = ({ images, ...selectedImage }) => (
  <Ul>
    <ImageGalleryItem images={images} {...selectedImage} />
  </Ul>
);

ImageGallery.propTypes = {
  images: propTypes.array.isRequired,
  selectedImage: propTypes.func.isRequired,
};

export default ImageGallery;
