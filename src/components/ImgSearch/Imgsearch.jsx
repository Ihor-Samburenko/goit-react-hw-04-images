import { useState, useEffect } from 'react';

import Searchbar from 'components/Searchbar/Searchbar';
import { searchPost } from 'components/Shared/api';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import Loader from 'components/Loader/Loader';

import css from '../ImgSearch/img.module.css';

const ImgSearch = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalHits, setTotalHits] = useState(0);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [bigImage, setBigImage] = useState('');
  const [tag, setTag] = useState('');

  useEffect(() => {
    async function fetch() {
      try {
        setLoading(true);
        const { data } = await searchPost(search, page);
        setImages(prevState => [...prevState, ...data.hits]);
        setTotalHits(data.totalHits);
      } catch (error) {
        console.log(error);
        setError({
          error: error.message || 'Upss... Try again',
        });
      } finally {
        setLoading(false);
      }
    }
    if (search) {
      fetch();
    }
  }, [page, search]);

  const updateSaerch = request => {
    if (search !== request) {
      setSearch(request);
      setPage(1);
      setImages([]);
    }
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const onShowModal = (url, alt) => {
    setShowModal(true);
    setBigImage(url);
    setTag(alt);
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <Modal close={onCloseModal}>
          <img src={bigImage} alt={tag} width="800wh" />
        </Modal>
      )}

      <Searchbar onSubmit={updateSaerch} />

      {loading && <Loader />}
      {error && <p>{error}</p>}
      {search !== '' && images.length === 0 && !loading && !error && (
        <p className={css.p}>Not found</p>
      )}
      <ImageGallery images={images} onShowModal={onShowModal} />
      {images.length > 0 && images.length !== totalHits && (
        <Button loadMore={loadMore} />
      )}
    </>
  );
};

export default ImgSearch;
