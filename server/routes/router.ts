import express from 'express';
import join from './join';
import login from './login';
import spotifyAuth from './spotifyAuth';
import refresh from './refresh';
import genres from './genres';
import search from './search';
import addTrack from './addTrack';
import getTrack from './getTrack';

const router = express.Router();

router.post('/join', join);
router.post('/login', login);
router.post('/spotify/auth', spotifyAuth);
router.post('/spotify/refresh', refresh);
router.post('/genres', genres);
router.get('/search', search);
router.post('/track/add', addTrack);
router.get('/track/read', getTrack);

export default router;
