import express from 'express';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const getTrack = async (req: express.Request, res: express.Response) => {
  const firebaseUid = req.query.firebaseUid as string;
  const userData = await getDoc(doc(db, 'firebaseUid', firebaseUid));
  if (!userData.exists()) return;
  const customTracks = userData.data().customTracks;
  return res.status(200).json({
    tracks: customTracks,
  });
};

export default getTrack;
