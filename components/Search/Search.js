import Image from 'next/image';
import { shape } from 'prop-types';
import { useState, useEffect } from 'react';
import SearchIcon from '../../assets/icons/search.png';
import StarEmpty from '../../assets/icons/star_empty.png';
import StarFilled from '../../assets/icons/star_filled.png';

export default function SearchInput(props) {
  const { favourites } = props;
  const [searchText, setSearchText] = useState('');
  const [favouriteExists, setFavouriteExists] = useState(false);

  useEffect(() => {
    if (searchText && favourites.length) {
      setFavouriteExists(favourites.some((fav) => fav === searchText));
    }
  }, [searchText]);

  const handleSearch = (value) => {
    setSearchText(value);
  };

  return (
    <div className="search-container">
      <input onChange={(e) => handleSearch(e.target.value)} />
      <div className="icons-container">
        <div className="star-icon">
          <Image
            src={favouriteExists ? StarFilled : StarEmpty}
            alt="search-icon"
          />
        </div>
        <div className="border-line" />
        <div className="search-icon">
          <Image src={SearchIcon} alt="search-icon" />
        </div>
      </div>
    </div>
  );
}

SearchInput.propTypes = {
  favourites: shape([]),
};

SearchInput.defaultProps = {
  favourites: [],
};
