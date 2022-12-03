import { useState, useEffect, useContext, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios, { AxiosError } from 'axios';

import { PlayerContext, PlayerType } from '../../../PlayerContext';
import {
  moveNextPosition,
  moveRandomPosition,
  RootState,
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
  playerInstance: Spotify.Player;
}

interface PlayError extends PlayProps {
  error: unknown;
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
  const { tracks, playMode, playingPosition, isPlay } = useSelector(
    (state: RootState) => state
  );
  const progress = useSelector((state: RootState) => state.progress.value);
  const { player, deviceId } = useContext(PlayerContext);
  const retryCountRef = useRef(retryCount);
  retryCountRef.current = retryCount;

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
    const playModeObject = {
      repeat: dispatchRepeatMode,
      shuffle: dispatchShuffleMode,
      normal: dispatchNormalMode,
    };
    console.log(playMode);
    playModeObject[playMode]();
  }, [isFinishTrackPlay]);
  const dispatchNormalMode = () => dispatch(moveNextPosition());

  const dispatchRepeatMode = () => {
    prepareToPlay(tracks[playingPosition].uri);
  };
  const dispatchShuffleMode = () => {
    console.log('shuffle');
    dispatch(moveRandomPosition());
  };

  const handleChangePlayingPosition = () => {
    console.log('player : ', playingPosition);
    if (isArrayEmpty(tracks)) return;
    setPlayingTrack(tracks[playingPosition].name);
    setPlayingTrackImage(tracks[playingPosition].album.images[2].url);
    const artistData = tracks[playingPosition].artists.map(
      (artist) => artist.name
    );
    setArtist(artistData.length < 2 ? artistData[0] : artistData.join(','));
    prepareToPlay(tracks[playingPosition].uri);
  };

  const detectFinishTrackPlay = (player: Spotify.Player) => {
    if (!player) return;
    player.addListener('player_state_changed', async (state) => {
      console.log('Player state changed', state);
      console.log('Playing Track', state.track_window.current_track.name);
      if (state.duration <= state.position) {
        appDispatch(getTrackProgress(player));
        setIsFinishTrackPlay(true);
      }
    });
  };

  const prepareToPlay = (uri: string): void => {
    if (!player) return;
    progress === 0 || progress === undefined
      ? play({
          spotify_uri: uri,
          playerInstance: player,
        })
      : resume(player);
    /*
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
    */
    dispatch(updatePlayState(true));
  };

  const play = ({ spotify_uri, playerInstance }: PlayProps) => {
    const {
      _options: { getOAuthToken },
    } = playerInstance;
    getOAuthToken(async () => {
      try {
        await axios.put(
          `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
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
        handlePlayerStateError({ error, spotify_uri, playerInstance });
      }
    });
  };

  const resume = (player: PlayerType) => {
    console.log('resume');
    player?.resume();
  };

  const handlePlayerStateError = ({
    error,
    spotify_uri,
    playerInstance,
  }: PlayError) => {
    if (error instanceof AxiosError) {
      if (error.response?.status === 502 || error.response?.status === 404) {
        setTimeout(() => retryPlay({ spotify_uri, playerInstance }), 3000);
        setRetryCount(retryCountRef.current + 1);
        dispatch(updateStatusMessage('트랙 재생을 재시도 중...'));
      }
    } else console.log(error);
  };

  const retryPlay = ({ spotify_uri, playerInstance }: PlayProps) => {
    console.log(retryCountRef.current);
    if (retryCountRef.current === 3) {
      setRetryCount(0);
      return dispatch(
        updateStatusMessage(
          '재생 재시도 횟수 초과. 다시 재생 버튼을 눌러주세요.'
        )
      );
    }
    console.log('retry');
    play({ spotify_uri, playerInstance });
  };

  return (
    <Wrap isPlay={isPlay}>
      <PlayerColumn>
        <PlayerTrackImage name={playingTrack} image={playingTrackImage} />
      </PlayerColumn>
      <PlayerColumn>
        <TrackName text={playingTrack} />
        <ArtistName text={artist} />
        <PlayerController player={player} onPlay={prepareToPlay} />
      </PlayerColumn>
    </Wrap>
  );
}

export default Player;
