import express from 'express';
import SpotifyWebApi from 'spotify-web-api-node';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const refresh = async (req: express.Request, res: express.Response) => {
  try {
    const firebaseUid: string = req.body.firebaseUid;
    const docSnap = await getDoc(doc(db, 'firebaseUid', firebaseUid));
    const data = docSnap.data();
    const refreshToken: string = data?.refreshToken;
    const spotifyApi = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      refreshToken,
    });
    const response = await spotifyApi.refreshAccessToken();
    res.status(200).json({
      accessToken: response.body.access_token,
      expiresIn: response.body.expires_in,
    });
  } catch (error) {
    console.log(error);
  }
};

export default refresh;
