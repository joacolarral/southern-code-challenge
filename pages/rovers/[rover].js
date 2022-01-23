/* eslint-disable no-use-before-define */
/* eslint-disable comma-dangle */
/* eslint-disable consistent-return */
import { arrayOf, shape, string } from 'prop-types';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Content } from 'antd/lib/layout/layout';
import moment from 'moment';
import PhotoGrid from '../../components/PhotoGrid/PhotoGrid';
import useScrollLoading from '../../hooks/useScrollLoading';
import { getPhotos } from '../../resolvers/photoResolvers';
import LayoutComponent from '../../components/Layout/Layout';
import Filters from '../../components/Filters/Filters';
import RoverService from '../../services/rovers';

export default function Rover(props) {
  const { photos, filters, roverName } = props;
  const [allPhotos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [filterState, setFilterState] = useState({
    sol: 1,
    cameraName: '',
    roverName,
    earthDate: moment(filters.max_date, 'YYYY/MM/DD'),
  });
  const getPhotoMars = () => {
    setIsLoading(true);
    getPhotos(filterState.roverName, pageNumber)
      .then((data) => setPhotos((prevState) => [...prevState, ...data]))
      .then(() => setIsLoading(false));
  };

  const lastElement = useScrollLoading(isLoading, setPageNumber, getPhotoMars);

  useEffect(() => {
    setPhotos(photos);
    setIsLoading(false);
  }, []);

  const handleFiltersChange = (values) => {
    setFilterState({ ...values });
  };

  return (
    <LayoutComponent>
      <Filters
        filterData={filters}
        filterState={filterState}
        filtersChange={handleFiltersChange}
      />
      <Content>
        <div>
          <PhotoGrid
            photosData={allPhotos}
            loading={isLoading}
            reachBottom={lastElement}
          />
        </div>
      </Content>
    </LayoutComponent>
  );
}

export async function getServerSideProps(context) {
  const { API_KEY } = process.env;
  const { params } = context;
  const allPhotos = await axios.get(
    `https://api.nasa.gov/mars-photos/api/v1/rovers/${
      params.rover
    }/photos?sol=1&page=${1}&api_key=${API_KEY}`
  );
  const roverFilters = await RoverService.getRoversFilters(params.rover);

  return {
    props: {
      photos: allPhotos.data.photos,
      filters: roverFilters,
      roverName: params.rover,
    },
  };
}

Rover.propTypes = {
  photos: arrayOf(shape({})),
  filters: arrayOf(shape({})),
  roverName: string.isRequired,
};

Rover.defaultProps = {
  photos: [],
  filters: [],
};
