import Image from 'next/image';
import BannerHome from '../../assets/img/background-home.jpeg';

export default function Banner() {
  return (
    <div className="banner-home">
      <div>
        <Image src={BannerHome} height={700} />
      </div>
      <div className="banner-title">
        <div>Welcome to DATA MARS</div>
      </div>
    </div>
  );
}
