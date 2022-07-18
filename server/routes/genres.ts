import express from 'express';
import SpotifyWebApi from 'spotify-web-api-node';

const genres = async (req: express.Request, res: express.Response) => {
  try {
    const accessToken = req.body.accessToken;
    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(accessToken);
    const response = await spotifyApi.getAvailableGenreSeeds();
    return res.status(200).json({ genres: response.body.genres });
  } catch (error) {
    console.log(error);
  }
};

export default genres;
