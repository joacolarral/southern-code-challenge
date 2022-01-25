/* eslint-disable no-param-reassign */
/* eslint-disable arrow-body-style */
/* eslint-disable import/prefer-default-export */
/* eslint-disable consistent-return */
/* eslint-disable comma-dangle */
import axios from 'axios';
import { notification } from 'antd';

const getRoverFilters = (rover) => {
  return axios
    .get(`/api/rovers/filters?rover=${rover}`)
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      return notification.error({
        message: 'There was an error, please try again',
      });
    });
};

export { getRoverFilters };
