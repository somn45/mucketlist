import { createContext } from 'react';

import { IPlayerContext } from './types/playerTypes/playerTypes';

const initialState: IPlayerContext = {
  player: null,
  deviceId: '',
};

export const PlayerContext = createContext<IPlayerContext>(initialState);
