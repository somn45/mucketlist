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
import styled from 'styled-components';
import PlayerTrackImage from './PlayerTrackImage/PlayerTrackImage';

interface PlayProps {
  spotify_uri: string;
  device_id: string;
  playerInstance: Spotify.Player;
}

interface PlayError extends PlayProps {
  error: AxiosError;
}

const PlayerColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

function Player() {
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();
  const [isFinishTrackPlay, setIsFinishTrackPlay] = useState(false);
  const [playingTrack, setPlayingTrack] = useState('');
  const [playingTrackImage, setPlayingTrackImage] = useState('');
  const [artist, setArtist] = useState('');
  const [retryCount, setRetryCount] = useState(0);
  const progress = useSelector((state: RootState) => state.progress.value);
  const tracks = useSelector((state: RootState) => state.tracks);
  const playMode = useSelector((state: RootState) => state.playMode);
  const playingPosition = useSelector(
    (state: RootState) => state.playingPosition
  );
  const isPlay = useSelector((state: RootState) => state.isPlay);
  const { player, deviceId } = useContext(PlayerContext);

  useEffect(() => {
    if (!player) return;
    detectFinishTrackPlay(player);
  }, [deviceId]);

  useEffect(() => {
    handleChangePlayingPosition();
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

  const handleChangePlayingPosition = () => {
    if (isArrayEmpty(tracks)) return;
    setPlayingTrack(tracks[playingPosition].name);
    setPlayingTrackImage(tracks[playingPosition].album.images[2].url);
    const artistData = tracks[playingPosition].artists.map(
      (artist) => artist.name
    );
    setArtist(artistData.length < 2 ? artistData[0] : artistData.join(','));
    onPlay(tracks[playingPosition].uri);
  };

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
      setTimeout(
        () => retryPlay({ spotify_uri, device_id, playerInstance }),
        3000
      );
      setRetryCount((prevCount) => prevCount + 1);
      dispatch(updateStatusMessage('트랙 재생을 재시도 중...'));
    }
  };

  const retryPlay = ({ spotify_uri, device_id, playerInstance }: PlayProps) => {
    console.log(retryCount);
    if (retryCount === 3) {
      setRetryCount(0);
      return dispatch(
        updateStatusMessage(
          '재생 재시도 횟수 초과. 다시 재생 버튼을 눌러주세요.'
        )
      );
    }
    play({ spotify_uri, device_id, playerInstance });
  };

  return (
    <Wrap isPlay={isPlay}>
      <PlayerColumn>
        <PlayerTrackImage name={playingTrack} image={playingTrackImage} />
      </PlayerColumn>
      <PlayerColumn>
        <TrackName text={playingTrack} />
        <ArtistName text={artist} />
        <PlayerController player={player} onPlay={onPlay} />
      </PlayerColumn>
    </Wrap>
  );
}

export default Player;
