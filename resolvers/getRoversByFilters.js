/* eslint-disable no-param-reassign */
/* eslint-disable arrow-body-style */
/* eslint-disable import/prefer-default-export */
/* eslint-disable consistent-return */
/* eslint-disable comma-dangle */
import axios from 'axios';
import { notification } from 'antd';
import qs from 'query-string';

const getRoversByFilters = (rover, query) => {
  const filtersQuery = {
    ...query,
  };
  if (query.earthDate) {
    filtersQuery.earthDate = query.earthDate.format('YYYY-MM-DD');
  }
  delete filtersQuery.roverName;
  return axios
    .get(`/api/rovers/${rover}?${qs.stringify(filtersQuery)}`)
    .then((res) => res.data)
    .catch(() => {
      return notification.error({
        message: 'There was an error, please try again',
      });
    });
};

export { getRoversByFilters };
