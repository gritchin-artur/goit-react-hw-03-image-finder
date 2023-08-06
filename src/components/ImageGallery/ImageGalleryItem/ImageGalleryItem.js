import { List, Img } from "./ImageGalleryItem.styled";
import propTypes from "prop-types";

const ImageGalleryItem = ({ images, selectedImage }) =>
  images.map(({ id, webformatURL, tags, largeImageURL }) => (
    <List key={id}>
      <Img
        src={webformatURL}
        alt={tags}
        onClick={() => selectedImage(largeImageURL, tags)}
      />
    </List>
  ));

ImageGalleryItem.propTypes = {
  images: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      webformatURL: propTypes.string.isRequired,
      tags: propTypes.string.isRequired,
      largeImageURL: propTypes.string.isRequired,
    })
  ),
  selectedImage: propTypes.func.isRequired,
};
export default ImageGalleryItem;
