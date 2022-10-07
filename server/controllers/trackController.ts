import express from 'express';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import SpotifyWebApi from 'spotify-web-api-node';
import { db } from '../firebase';
import fetch from 'node-fetch';

interface addTrackControllerBody {
  track: {
    id: string;
    artistId: string;
  };
  accessToken: string;
  firebaseUid: string;
}

interface addTrackPlayerQueueBody {
  uri: string;
  deviceId: string;
  accessToken: string;
}

export const genres = async (req: express.Request, res: express.Response) => {
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

export const search = async (req: express.Request, res: express.Response) => {
  const accessToken = req.query.accessToken as string;
  const genres = req.query.genre as string;
  const parsedGenres = JSON.parse(genres);
  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(accessToken);
  const response = await spotifyApi.getRecommendations({
    seed_genres: parsedGenres,
    limit: 100,
  });
  return res.json({
    tracks: response.body.tracks,
  });
};

export const addTrack = async (req: express.Request, res: express.Response) => {
  const { track, accessToken, firebaseUid }: addTrackControllerBody = req.body;
  const userData = await getDoc(doc(db, 'firebaseUid', firebaseUid));
  if (!userData.exists()) return;

  let customTracks = userData.data().customTracks;
  if (!customTracks) customTracks = [];

  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(accessToken);
  const response = await spotifyApi.getArtist(track.artistId);
  const customTrack = { ...track, genres: response.body.genres };
  const data = await setDoc(
    doc(db, 'firebaseUid', firebaseUid),
    {
      customTracks: [...customTracks, customTrack],
    },
    { merge: true }
  );
  return res.sendStatus(200);
};

export const getTrack = async (req: express.Request, res: express.Response) => {
  try {
    console.log('get track');
    const firebaseUid = req.query.firebaseUid as string;
    const userData = await getDoc(doc(db, 'firebaseUid', firebaseUid));
    if (!userData.exists()) return;
    const customTracks = userData.data().customTracks;
    return res.status(200).json({
      tracks: customTracks,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addTrackPlayerQueue = async (
  req: express.Request,
  res: express.Response
) => {
  const { uri, deviceId, accessToken }: addTrackPlayerQueueBody = req.body;
  const response = await fetch(
    `https://api.spotify.com/v1/me/player/queue?uri=${uri}&device_id=${deviceId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  console.log(response);
  return res.sendStatus(200);
};
