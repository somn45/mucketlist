import express from 'express';
import { auth, db } from '../src/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import SpotifyWebApi from 'spotify-web-api-node';

interface UserFormBody {
  email: string;
  password: string;
}

interface SpotifyAuthBody {
  code: string;
  fuid: string;
}

export const join = async (req: express.Request, res: express.Response) => {
  const { email, password }: UserFormBody = req.body;
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await setDoc(doc(db, 'firebaseUid', response.user.uid), {
      email: response.user.email,
    });
    return res.status(201).json({
      firebaseUid: response.user.uid,
    });
  } catch (error) {
    if (error instanceof FirebaseError) {
      if (error.code === 'auth/email-already-in-use') {
        return res.status(400).json({
          errorMsg: '이미 가입된 회원의 이메일입니다.',
        });
      }
    } else console.log(error);
  }
};

export const login = async (req: express.Request, res: express.Response) => {
  const { email, password }: UserFormBody = req.body;
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return res.status(200).json({
      firebaseUid: response.user.uid,
    });
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.log(error);
      if (error.code === 'auth/user-not-found') {
        return res.status(400).json({
          errorMsg: '가입되어 있는 이메일이 아닙니다',
        });
      }
      if (error.code === 'auth/wrong-password') {
        return res.status(400).json({
          errorMsg: '이메일/비밀번호가 일치하지 않습니다.',
        });
      }
    } else console.log(error);
  }
};

export const spotifyAuth = async (
  req: express.Request,
  res: express.Response
) => {
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
    res.status(202).json({
      accessToken: response.body.access_token,
      expiresIn: response.body.expires_in,
    });
  } catch (error) {
    console.log(error);
  }
};

export const refresh = async (req: express.Request, res: express.Response) => {
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
