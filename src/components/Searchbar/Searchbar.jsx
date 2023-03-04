import { useState } from 'react';
import PropTypes from 'prop-types';

import { HiSearch } from 'react-icons/hi';
import css from '../Searchbar/Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const handleChange = ({ target }) => {
    const { value } = target;
    setSearch(value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(search);
    setSearch('');
  };

  return (
    <header className={css.searchbar}>
      <form onSubmit={handleSubmit} className={css.form}>
        <button type="submit" className={css.button}>
          <HiSearch />
        </button>

        <input
          name="search"
          value={search}
          onChange={handleChange}
          className={css.input}
          type="text"
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.prototype = {
  onSubmit: PropTypes.func,
};
export default Searchbar;

// class Searchbar extends Component {
//   state = {
//     search: '',
//   };

//   handleChange = ({ target }) => {
//     const { name, value } = target;

//     this.setState({
//       [name]: value,
//     });
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     const { onSubmit } = this.props;
//     onSubmit({ ...this.state });
//     this.reset();
//   };

//   reset() {
//     this.setState({ search: '' });
//   }

//   render() {
//     const { search } = this.state;
//     return (
//       <header className={css.searchbar}>
//         <form onSubmit={this.handleSubmit} className={css.form}>
//           <button type="submit" className={css.button}>
//             <HiSearch />
//           </button>

//           <input
//             name="search"
//             value={search}
//             onChange={this.handleChange}
//             className={css.input}
//             type="text"
//             placeholder="Search images and photos"
//           />
//         </form>
//       </header>
//     );
//   }
// }
