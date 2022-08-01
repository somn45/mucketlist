import express from 'express';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import SpotifyWebApi from 'spotify-web-api-node';
import { db } from '../firebase';

interface addTrackControllerBody {
  track: {
    id: string;
    artistId: string;
  };
  accessToken: string;
  firebaseUid: string;
}

const addTrack = async (req: express.Request, res: express.Response) => {
  const { track, accessToken, firebaseUid }: addTrackControllerBody = req.body;
  const userData = await getDoc(doc(db, 'firebaseUid', firebaseUid));
  if (!userData.exists()) return;

  let customTracks = userData.data().customTracks;
  if (!customTracks) customTracks = [];
  console.log(customTracks);

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

export default addTrack;
