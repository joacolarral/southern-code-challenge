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
import LayoutComponent from '../../components/Layout/Layout';
import Filters from '../../components/Filters/Filters';
import RoverService from '../../services/rovers';
import { getRoversByFilters } from '../../resolvers/getRoversByFilters';
import { getRoverFilters } from '../../resolvers/getRoverFilters';

export default function Rover(props) {
  const { photos, filters, roverName } = props;
  const [allPhotos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [pageNumber, setPageNumber] = useState(2);
  const [filterState, setFilterState] = useState({
    cameraName: 'all',
    sol: 1,
    roverName,
    earthDate: moment(filters.max_date, 'YYYY/MM/DD'),
    checked: false,
  });
  const [roversFilter, setRoversFilter] = useState(filters);

  const fetchPhotos = async (page) => {
    const filterQuery = {
      ...filterState,
      pageNumber: page,
    };
    if (filterState.checked) delete filterQuery.earthDate;
    if (!filterState.checked) delete filterQuery.sol;
    delete filterQuery.checked;

    return getRoversByFilters(filterState.roverName, filterQuery).then(
      (data) => {
        setHasMore(data.length === 25);
        if (page === 1) return setPhotos(data);
        return setPhotos((prevState) => [...prevState, ...data]);
      }
    );
  };

  const getPhotosByScrolling = () => {
    if (!hasMore) return;
    setIsLoading(true);
    fetchPhotos(pageNumber).then(() => setIsLoading(false));
  };

  const lastElement = useScrollLoading(
    isLoading,
    setPageNumber,
    getPhotosByScrolling,
    [hasMore, filterState, isLoading, pageNumber]
  );

  useEffect(() => {
    setPhotos(photos);
    setIsLoading(false);
  }, []);

  const handleFilterStateChange = (name, value) => {
    setFilterState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleRoverNameChange = (value) => {
    handleFilterStateChange('roverName', value);
    getRoverFilters(value).then((resfilters) => {
      setRoversFilter(resfilters);
      setFilterState((prevState) => ({
        ...prevState,
        earthDate: moment(resfilters.max_date),
      }));
    });
  };

  const changeAllFilterState = (newState) => {
    setFilterState(newState);
  };

  const handleFiltersChange = () => {
    setPageNumber(1);
    fetchPhotos(1).then(() => setIsLoading(false));
  };

  return (
    <LayoutComponent>
      <Filters
        filterData={roversFilter}
        filterState={filterState}
        filtersChange={handleFiltersChange}
        loading={isLoading}
        handleRoverNameChange={handleRoverNameChange}
        handleFiltersChange={handleFilterStateChange}
        changeAllFilterState={changeAllFilterState}
      />
      <Content>
        <div>
          <PhotoGrid
            photosData={allPhotos}
            loading={isLoading}
            reachBottom={lastElement}
            hasMore={hasMore}
          />
        </div>
      </Content>
    </LayoutComponent>
  );
}

export async function getServerSideProps(context) {
  const { API_KEY } = process.env;
  const { params } = context;
  const roverFilters = await RoverService.getRoversFilters(params.rover);
  const allPhotos = await axios.get(
    `https://api.nasa.gov/mars-photos/api/v1/rovers/${
      params.rover
    }/photos?page=${1}&earth_date=${moment(roverFilters.max_date).format(
      'YYYY-MM-DD'
    )}&api_key=${API_KEY}`
  );
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
  filters: shape({}),
  roverName: string.isRequired,
};

Rover.defaultProps = {
  photos: [],
  filters: {},
};
