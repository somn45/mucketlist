import express from 'express';
import {
  genres,
  search,
  addTrack,
  getTrack,
  deleteTrack,
  addTrackPlayerQueue,
} from '../controllers/trackController';

const trackRouter = express.Router();

trackRouter.post('/genres', genres);
trackRouter.get('/search', search);
trackRouter.post('/add', addTrack);
trackRouter.get('/read', getTrack);
trackRouter.delete('/delete', deleteTrack);
trackRouter.post('/player/add', addTrackPlayerQueue);

export default trackRouter;
