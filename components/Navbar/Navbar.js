import Image from 'next/image';
import nasaRickAndMorty from '../../assets/img/Nasa-Rick-And-Morty.png';
import SearchInput from '../Search/Search';

export default function Navbar() {
  return (
    <div className="navbar-container">
      <div className="navbar-brand">
        <div className="nav-img">
          <Image
            src={nasaRickAndMorty}
            alt="Picture of the author"
            // height={500} automatically provided
            // blurDataURL="data:..." automatically provided
            // placeholder="blur" // Optional blur-up while loading
          />
        </div>
        <SearchInput />
      </div>
    </div>
  );
}
