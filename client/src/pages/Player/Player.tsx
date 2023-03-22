import { useState, useEffect, useContext, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios, { AxiosError } from 'axios';

import PlayerWrap from './Wrap/PlayerWrap';
import PlayerColumn from './Column/PlayerColumn';
import getToken from '../../utils/functions/getToken';
import isArrayEmpty from '../../utils/functions/isArrayEmpty';
import PlayerController from './PlayerController/PlayerController';
import PlayerTrackInfo from './PlayerTrackInfo/PlayerTrackInfo';
import PlayerTrackImage from './PlayerTrackImage/PlayerTrackImage';

import {
  PlayerInfo,
  PlayError,
  playerType,
  PlayProps,
} from '../../types/playerTypes/playerTypes';

import { PlayerContext } from '../../PlayerContext';
import {
  moveNextPosition,
  moveRandomPosition,
  RootState,
  updatePlayState,
  updateStatusMessage,
} from '../../store/reducers/rootReducer';
import { DEFAULT_TRACK_DATA } from '../../constants/constants';

function Player() {
  const dispatch = useDispatch();
  const [isFinishTrackPlay, setIsFinishTrackPlay] = useState(false);
  const [PlayingTrackData, setPlayingTrackData] =
    useState<PlayerInfo>(DEFAULT_TRACK_DATA);
  const [progress, setProgress] = useState(0);
  const [retryCount, setRetryCount] = useState(0);
  const { tracks, playMode, playingPosition, isPlay } = useSelector(
    (state: RootState) => state
  );
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
    playModeObject[playMode]();
  }, [isFinishTrackPlay]);

  const dispatchNormalMode = () => dispatch(moveNextPosition());

  const dispatchRepeatMode = () => {
    prepareToPlay(tracks[playingPosition].uri);
  };
  const dispatchShuffleMode = () => {
    dispatch(moveRandomPosition());
  };

  const handleChangePlayingPosition = () => {
    if (isArrayEmpty(tracks)) return;
    const artistData = tracks[playingPosition].artists.map(
      (artist) => artist.name
    );
    setPlayingTrackData({
      playingTrack: tracks[playingPosition].name,
      artist: artistData.length < 2 ? artistData[0] : artistData.join(','),
      trackImage: tracks[playingPosition].album.images[2].url,
    });
    prepareToPlay(tracks[playingPosition].uri);
  };

  const detectFinishTrackPlay = async (player: Spotify.Player) => {
    if (!player) return;
    player.addListener('player_state_changed', async (state) => {
      console.log('Player state changed', state);
      console.log('Playing Track', state.track_window.current_track.name);
      if (state.duration <= state.position) {
        const data = await player.getCurrentState();
        if (!data) return;
        setProgress(data.position);
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
              Authorization: `Bearer ${getToken('accessToken')}`,
            },
          }
        );
      } catch (error) {
        handlePlayerStateError({ error, spotify_uri, playerInstance });
      }
    });
  };

  const resume = (player: playerType) => {
    player?.resume();
  };

  const handlePlayerStateError = ({
    error,
    spotify_uri,
    playerInstance,
  }: PlayError) => {
    if (error instanceof AxiosError) {
      if (error.response?.status === 502 || error.response?.status === 404) {
        retryCountRef.current += 1;
        setRetryCount(retryCountRef.current);
        setTimeout(() => retryPlay({ spotify_uri, playerInstance }), 3000);
        dispatch(updateStatusMessage('트랙 재생을 재시도 중...'));
      }
    } else console.log(error);
  };

  const retryPlay = ({ spotify_uri, playerInstance }: PlayProps) => {
    if (retryCountRef.current === 3) {
      setRetryCount(0);
      return dispatch(
        updateStatusMessage(
          '재생 재시도 횟수 초과. 다시 재생 버튼을 눌러주세요.'
        )
      );
    }
    play({ spotify_uri, playerInstance });
  };

  return (
    <PlayerWrap isPlay={isPlay}>
      <PlayerColumn>
        <PlayerTrackImage
          playingTrack={PlayingTrackData.playingTrack}
          trackImage={PlayingTrackData.trackImage}
        />
      </PlayerColumn>
      <PlayerColumn>
        <PlayerTrackInfo
          playingTrack={PlayingTrackData.playingTrack}
          artist={PlayingTrackData.artist}
        />
        <PlayerController
          player={player}
          onPlay={prepareToPlay}
          clearProgress={() => setProgress(0)}
        />
      </PlayerColumn>
    </PlayerWrap>
  );
}

export default Player;
