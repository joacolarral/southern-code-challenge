/* eslint-disable no-use-before-define */
/* eslint-disable comma-dangle */
/* eslint-disable consistent-return */
import Head from 'next/head';
import { arrayOf, shape } from 'prop-types';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Banner from './components/Banner';
import Navbar from '../../components/Navbar/Navbar';
import PhotoGrid from '../../components/PhotoGrid/PhotoGrid';
import useScrollLoading from '../../hooks/useScrollLoading';
import { getPhotos } from '../../resolvers/photoResolvers';

export default function Home(props) {
  const { photos } = props;
  const [allPhotos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);

  const getPhotoMars = () => {
    setIsLoading(true);
    getPhotos(pageNumber)
      .then((data) => setPhotos((prevState) => [...prevState, ...data]))
      .then(() => setIsLoading(false));
  };

  const lastElement = useScrollLoading(isLoading, setPageNumber, getPhotoMars);

  useEffect(() => {
    setPhotos(photos);
    setIsLoading(false);
  }, []);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Banner />
      <PhotoGrid
        photosData={allPhotos}
        loading={isLoading}
        reachBottom={lastElement}
      />
    </div>
  );
}

export async function getServerSideProps() {
  const { API_KEY } = process.env;
  const allPhotos = await axios.get(
    `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=0&page=${1}&api_key=${API_KEY}`
  );

  return {
    props: {
      photos: allPhotos.data.photos,
    },
  };
}

Home.propTypes = {
  photos: arrayOf(shape({})),
};

Home.defaultProps = {
  photos: [],
};
