import PropTypes from 'prop-types';
import css from '../ImageGallery/ImageGallery.module.css';

import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images, onShowModal }) => {
  const imageList = images.map(image => (
    <ImageGalleryItem onShowModal={onShowModal} key={image.id} {...image} />
  ));

  return <ul className={css.gallery}>{imageList}</ul>;
};

export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  showModal: PropTypes.func,
};
