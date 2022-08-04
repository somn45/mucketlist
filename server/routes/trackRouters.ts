import express from 'express';
import {
  genres,
  search,
  addTrack,
  getTrack,
} from '../controllers/trackController';

const trackRouter = express.Router();

trackRouter.post('/genres', genres);
trackRouter.get('/search', search);
trackRouter.post('/add', addTrack);
trackRouter.get('/read', getTrack);

export default trackRouter;
