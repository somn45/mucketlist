export type playerType = Spotify.Player | null;

export interface IPlayer {
  player: playerType;
}

export interface IPlayerContext extends IPlayer {
  deviceId: string;
}

export interface PlayProps {
  spotify_uri?: string;
  playerInstance?: Spotify.Player;
}

export interface PlayError extends PlayProps {
  error: unknown;
}

export interface IPlayerTrack {
  trackName: string;
}

export interface PlayerInfo extends IPlayerTrack {
  artist?: string;
  trackImage?: string;
}

export interface IPlayMode {
  isRepeat?: boolean;
  isShuffle?: boolean;
}
