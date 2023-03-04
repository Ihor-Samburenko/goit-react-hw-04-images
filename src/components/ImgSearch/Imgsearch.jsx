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
    const fetch = async () => {
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
    };
    fetch();
  }, []);

  const updateSaerch = ({ search }) => {
    setSearch(search);
    setPage(1);
    setImages([]);
  };

  const LoadMore = () => {
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
        <Button loadMore={LoadMore} />
      )}
    </>
  );
};

export default ImgSearch;

// class ImgSearch extends Component {
//   state = {
//     page: 1,
//     search: '',
//     images: [],
//     loading: false,
//     error: null,
//     showModal: false,
//     bigImage: '',
//     tag: '',
//     totalHits: 0,
//   };

//   componentDidUpdate(_, prevState) {
//     const { search, page } = this.state;
//     if (search !== prevState.search || page !== prevState.page) {
//       this.fetchPosts();
//     }
//   }

//   updateSaerch = ({ search }) => {
//     if (search === this.state.search) {
//       return;
//     }
//     this.setState({ search, images: [], page: 1 });
//   };

//   async fetchPosts() {
//     const { search, page } = this.state;
//     try {
//       this.setState({ loading: true });

//       const { data } = await searchPost(search, page);
//       console.log(data);
//       this.setState(({ images }) => ({
//         images: [...images, ...data.hits],
//         totalHits: data.totalHits,
//       }));
//     } catch (error) {
//       console.log(error);
//       this.setState({
//         error: error.message || 'Upss... Try again',
//       });
//     } finally {
//       this.setState({ loading: false });
//     }
//   }

//   loadMore = () => {
//     this.setState(({ page }) => ({
//       page: page + 1,
//     }));
//   };

//   showModal = (url, alt) => {
//     this.setState({
//       showModal: true,
//       bigImage: url,
//       tag: alt,
//     });
//   };

//   closeModal = () => {
//     this.setState({
//       showModal: false,
//     });
//   };

//   render() {
//     const {
//       images,
//       loading,
//       error,
//       showModal,
//       tag,
//       bigImage,
//       search,
//       totalHits,
//     } = this.state;

//     return (
//       <>
//         {showModal && (
//           <Modal close={this.closeModal}>
//             <img src={bigImage} alt={tag} width="800wh" />
//           </Modal>
//         )}

//         <Searchbar onSubmit={this.updateSaerch} />
//         {loading && <Loader />}
//         {error && <p>{error}</p>}
//         {search !== '' && images.length === 0 && !loading && !error && (
//           <p className={css.p}>Not found</p>
//         )}
//         <ImageGallery images={images} showModal={this.showModal} />
//         {images.length > 0 && images.length !== totalHits && (
//           <Button loadMore={this.loadMore} />
//         )}
//       </>
//     );
//   }
// }
