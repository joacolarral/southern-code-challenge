import Head from 'next/head';
import Banner from '../../components/Banner/Banner';
import Navbar from '../../components/Navbar/Navbar';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Banner />
    </div>
  );
}
