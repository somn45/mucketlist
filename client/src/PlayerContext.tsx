import { createContext } from 'react';
import { IPlayerContext } from './WebPlayback';

const initialState = {
  player: null,
  deviceId: '',
};

export const PlayerContext = createContext<IPlayerContext>(initialState);
