import express from 'express';
import {
  join,
  login,
  spotifyAuth,
  refresh,
} from '../controllers/userController';
const userRouter = express.Router();

userRouter.post('/join', join);
userRouter.post('/login', login);
userRouter.post('/spotify/auth', spotifyAuth);
userRouter.post('/spotify/refresh', refresh);

export default userRouter;
