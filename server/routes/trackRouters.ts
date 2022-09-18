import express from 'express';
import {
  genres,
  search,
  addTrack,
  getTrack,
  addTrackPlayerQueue,
} from '../controllers/trackController';

const trackRouter = express.Router();

trackRouter.post('/genres', genres);
trackRouter.get('/search', search);
trackRouter.post('/add', addTrack);
trackRouter.get('/read', getTrack);
trackRouter.post('/player/add', addTrackPlayerQueue);

export default trackRouter;
