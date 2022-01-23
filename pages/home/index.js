/* eslint-disable no-use-before-define */
/* eslint-disable comma-dangle */
/* eslint-disable consistent-return */
import { useEffect, useState } from 'react';
import { Layout } from 'antd';
import Banner from './components/Banner';
import PhotoGrid from '../../components/PhotoGrid/PhotoGrid';
import useScrollLoading from '../../hooks/useScrollLoading';
import { getPhotos } from '../../resolvers/photoResolvers';
import FooterComponent from '../../components/Footer';
import LayoutComponent from '../../components/Layout/Layout';

const { Content } = Layout;

export default function Home() {
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
    setIsLoading(false);
  }, []);

  return (
    <LayoutComponent>
      <Banner />
      <Content style={{ padding: '0 50px' }}>
        <div>
          <PhotoGrid
            photosData={allPhotos}
            loading={isLoading}
            reachBottom={lastElement}
          />
        </div>
      </Content>
      <FooterComponent />
    </LayoutComponent>
  );
}
