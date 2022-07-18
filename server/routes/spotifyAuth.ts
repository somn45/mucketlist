import express from 'express';
import SpotifyWebApi from 'spotify-web-api-node';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

interface SpotifyAuthBody {
  code: string;
  fuid: string;
}

const spotifyAuth = async (req: express.Request, res: express.Response) => {
  const WEEK = 1000 * 60 * 60 * 24 * 7;
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: 'http://localhost:3000',
  });
  try {
    const { code, fuid }: SpotifyAuthBody = req.body;
    const response = await spotifyApi.authorizationCodeGrant(code);
    await setDoc(
      doc(db, 'firebaseUid', fuid),
      {
        refreshToken: response.body.refresh_token,
        scope: response.body.scope,
      },
      { merge: true }
    );
    return res.status(201).json({
      accessToken: response.body.access_token,
      expiresIn: response.body.expires_in,
    });
  } catch (error) {
    console.log(error);
  }
};

export default spotifyAuth;
