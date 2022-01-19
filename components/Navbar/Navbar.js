import Image from 'next/image';
import nasaRickAndMorty from '../../assets/img/Nasa-Rick-And-Morty.png';

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
        <div>Nasssa</div>
      </div>
    </div>
  );
}
