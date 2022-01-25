/* eslint-disable arrow-body-style */
/* eslint-disable consistent-return */
/* eslint-disable no-case-declarations */
/* eslint-disable eol-last */

import RoverService from '../../../services/rovers';

/* eslint-disable comma-dangle */

const getRoverData = async (roverName) => {
  return RoverService.getRoversFilters(roverName);
};

export default async function handler(req, res) {
  const { query, method } = req;
  const { rover } = query;

  switch (method) {
    case 'GET':
      const response = await getRoverData(rover);
      return res.status(200).json(response);
    default:
      res.status(404).end('Endpoint not found');
  }
}
