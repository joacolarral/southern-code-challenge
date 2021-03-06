/* eslint-disable comma-dangle */
const axios = require('axios');
const qs = require('query-string');
const { default: filterFormatter } = require('../utils/filterFormatter');

const { API_KEY } = process.env;

class RoverService {
  static async getAllRovers() {
    return axios.get(
      `https://api.nasa.gov/mars-photos/api/v1/rovers?${API_KEY}`
    );
  }

  static async photosByFilter(rover, query) {
    const queryFormatted = qs.stringify(query);
    console.log(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?${queryFormatted}&api_key=${API_KEY}`
    );
    return axios.get(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?${queryFormatted}&api_key=${API_KEY}`
    );
  }

  static async getRoversFilters(rover) {
    const roverInfo = await axios.get(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}?api_key=${API_KEY}`
    );
    return filterFormatter(roverInfo.data.rover);
  }
}

module.exports = RoverService;
