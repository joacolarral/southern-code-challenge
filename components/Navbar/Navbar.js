import Image from 'next/image';
import { Layout } from 'antd';
import Link from 'next/link';
import nasaRickAndMorty from '../../assets/img/Nasa-Rick-And-Morty.png';

const { Header } = Layout;

export default function Navbar() {
  return (
    <Header>
      <div className="nav-img">
        <Link href="/">
          <Image src={nasaRickAndMorty} alt="Picture of the author" />
        </Link>
      </div>
    </Header>
  );
}
