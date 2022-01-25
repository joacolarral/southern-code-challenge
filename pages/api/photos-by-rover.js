/* eslint-disable eol-last */

import RoverService from '../../services/rovers';

/* eslint-disable comma-dangle */

export default async function handler(req, res) {
  const { query } = req;
  const { page, rover } = query;

  try {
    const response = await RoverService.photosByRoverPage(rover, page);
    res.status(200).json(response.data.photos);
  } catch (error) {
    res.status(500).json(error);
  }
}
