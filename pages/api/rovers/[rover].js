/* eslint-disable arrow-body-style */
/* eslint-disable consistent-return */
/* eslint-disable no-case-declarations */
/* eslint-disable eol-last */

import RoverService from '../../../services/rovers';

/* eslint-disable comma-dangle */

const getRoverData = async (roverName, query) => {
  return RoverService.photosByFilter(roverName, query);
};

export default async function handler(req, res) {
  const { query, method } = req;
  const { rover } = query;
  const filterQuery = {};

  filterQuery.page = query.pageNumber;
  if (query.cameraName !== 'all') filterQuery.camera = query.cameraName;
  if (query.sol) filterQuery.sol = query.sol;
  if (query.earthDate) filterQuery.earth_date = query.earthDate;

  delete query.roverName;
  switch (method) {
    case 'GET':
      const response = await getRoverData(rover, filterQuery);
      return res.status(200).json(response.data.photos);
    default:
      res.status(404).end('Endpoint not found');
  }
}
