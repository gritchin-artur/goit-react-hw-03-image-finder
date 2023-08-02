import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";
import css from "./ImageGallery.module.css";

const ImageGallery = () => (
  <ul className={css.galleryItem}>
    <ImageGalleryItem />
  </ul>
);

export default ImageGallery;
