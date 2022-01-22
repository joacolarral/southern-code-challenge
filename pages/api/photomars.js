/* eslint-disable eol-last */
/* eslint-disable comma-dangle */
const axios = require('axios');

export default async function handler(req, res) {
  const { API_KEY } = process.env;
  const { query: page } = req;

  try {
    const response = await axios.get(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=0&page=${page}&api_key=${API_KEY}`
    );
    res.status(200).json(response.data.photos);
  } catch (error) {
    res.status(500).json(error);
  }
}
