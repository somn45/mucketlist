import express from 'express';
import SpotifyWebApi from 'spotify-web-api-node';

const search = async (req: express.Request, res: express.Response) => {
  const accessToken = req.query.accessToken as string;
  const genres = req.query.genre as string;
  const parsedGenres = JSON.parse(genres);
  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(accessToken);
  const response = await spotifyApi.getRecommendations({
    seed_genres: parsedGenres,
    limit: 64,
  });
  return res.json({
    tracks: response.body,
  });
};

export default search;
