import { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios, { AxiosError } from 'axios';

import { PlayerContext } from '../../../PlayerContext';
import {
  moveNextPosition,
  moveRandomPosition,
  RootState,
  updatePlayMode,
  updatePlayState,
  updateStatusMessage,
} from '../../../store/reducers/rootReducer';
import getTokens from '../../../utils/functions/getTokens';
import isArrayEmpty from '../../../utils/functions/isArrayEmpty';
import TrackName from './TrackName/TrackName';
import ArtistName from './ArtistName/ArtistName';
import Wrap from './Wrap/Wrap';
import PlayerController from './PlayerController/PlayerController';
import { getTrackProgress } from '../../../store/reducers/thunk/progress';
import { useAppDispatch } from '../../../store/store';

interface PlayProps {
  spotify_uri: string;
  device_id: string;
  playerInstance: Spotify.Player;
}

interface PlayError extends PlayProps {
  error: AxiosError;
}

function Player() {
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();
  const [isFinishTrackPlay, setIsFinishTrackPlay] = useState(false);
  const [playingTrack, setPlayingTrack] = useState('');
  const [artist, setArtist] = useState('');
  const progress = useSelector((state: RootState) => state.progress.value);
  const tracks = useSelector((state: RootState) => state.tracks);
  const playMode = useSelector((state: RootState) => state.playMode);
  const playingPosition = useSelector(
    (state: RootState) => state.playingPosition
  );
  const { player, deviceId } = useContext(PlayerContext);
  console.log(playMode);

  useEffect(() => {
    if (!player) return;
    detectFinishTrackPlay(player);
  }, [deviceId]);

  useEffect(() => {
    if (isArrayEmpty(tracks)) return;
    setPlayingTrack(tracks[playingPosition].name);
    const artistData = tracks[playingPosition].artists.map(
      (artist) => artist.name
    );
    setArtist(artistData.length < 2 ? artistData[0] : artistData.join(','));
    onPlay(tracks[playingPosition].uri);
  }, [playingPosition]);

  useEffect(() => {
    if (!isFinishTrackPlay) return;
    setIsFinishTrackPlay(false);
    if (playMode === 'repeat') {
      dispatch(updatePlayMode('repeat'));
      onPlay(tracks[playingPosition].uri);
    } else if (playMode === 'shuffle') {
      dispatch(moveRandomPosition());
      dispatch(updatePlayMode('shuffle'));
    } else dispatch(moveNextPosition());
  }, [isFinishTrackPlay]);

  const detectFinishTrackPlay = (player: Spotify.Player) => {
    player.addListener('player_state_changed', async (state) => {
      if (!player) return;
      console.log('Player state changed', state);
      console.log('Playing Track', state.track_window.current_track.name);
      if (state.duration <= state.position) {
        appDispatch(getTrackProgress(player));
        setIsFinishTrackPlay(true);
      }
    });
  };

  const onPlay = (uri: string): void => {
    if (!player) return;
    if (progress === 0 || progress === undefined) {
      {
        play({
          spotify_uri: uri,
          device_id: deviceId,
          playerInstance: player,
        });
      }
    } else {
      player?.resume();
      console.log('resume');
    }
    dispatch(updatePlayState(true));
  };

  const play = ({ spotify_uri, device_id, playerInstance }: PlayProps) => {
    const {
      _options: { getOAuthToken },
    } = playerInstance;
    getOAuthToken(async () => {
      try {
        await axios.put(
          `https://api.spotify.com/v1/me/player/play?device_id=${device_id}`,
          {
            uris: [spotify_uri],
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${getTokens()}`,
            },
          }
        );
      } catch (error) {
        if (error instanceof AxiosError)
          handlePlayerStateError({
            error,
            spotify_uri,
            device_id,
            playerInstance,
          });
        else console.log(error);
      }
    });
  };

  const handlePlayerStateError = ({
    error,
    spotify_uri,
    device_id,
    playerInstance,
  }: PlayError) => {
    if (error.response?.status === 502 || error.response?.status === 404) {
      let errorCost = 0;
      setTimeout(
        () => retryPlay({ spotify_uri, device_id, playerInstance }),
        3000
      );
      dispatch(updateStatusMessage('오류로 인해 트랙 재생을 재시도합니다.'));
      errorCost++;
      if (errorCost > 5) {
        dispatch(
          updateStatusMessage(
            '재시도 횟수가 초과되었습니다. 재생 버튼을 다시 눌러주세요.'
          )
        );
      }
    }
  };

  const retryPlay = ({ spotify_uri, device_id, playerInstance }: PlayProps) => {
    play({ spotify_uri, device_id, playerInstance });
  };

  return (
    <Wrap>
      <TrackName text={playingTrack} />
      <ArtistName text={artist} />
      <PlayerController player={player} onPlay={onPlay} />
    </Wrap>
  );
}

export default Player;
