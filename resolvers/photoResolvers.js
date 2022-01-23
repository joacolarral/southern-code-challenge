/* eslint-disable arrow-body-style */
/* eslint-disable import/prefer-default-export */
/* eslint-disable consistent-return */
/* eslint-disable comma-dangle */
import axios from 'axios';
import { notification } from 'antd';

const getPhotos = (rover, page = 1) => {
  return axios
    .get(`/api/photos-by-rover?page=${page}&rover=${rover}`)
    .then((res) => res.data)
    .catch(() => {
      return notification.error({
        message: 'There was an error, please try again',
      });
    });
};

export { getPhotos };
