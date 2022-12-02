import { createContext } from 'react';
import { IPlayerContext } from './WebPlayback';

export type PlayerType = Spotify.Player | null;

type PlayerContextType = {
  player: PlayerType;
  deviceId: string;
};

const initialState: PlayerContextType = {
  player: null,
  deviceId: '',
};

export const PlayerContext = createContext<IPlayerContext>(initialState);
