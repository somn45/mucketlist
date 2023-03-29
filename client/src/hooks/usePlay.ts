import { useState, useRef } from 'react';
import axios, { AxiosError } from 'axios';
import { useSelector } from 'react-redux';
import {
  RootState,
  updatePlayState,
  updateStatusMessage,
} from '../store/reducers/rootReducer';
import { useAppDispatch } from '../store/store';
import { PlayError, playerType } from '../types/playerTypes/playerTypes';
import getToken from '../utils/functions/getToken';
import { ITrack } from '../types/trackTypes/trackTypes';

type usePlayProps = [() => Promise<void>, string];

const usePlay = (
  player: playerType,
  deviceId: string,
  tracks: ITrack[]
): usePlayProps => {
  const dispatch = useAppDispatch();
  const { playingPosition } = useSelector((state: RootState) => state);
  const [errorMsg, setErrorMsg] = useState('');
  const [retryCount, setRetryCount] = useState(0);
  const retryCountRef = useRef(retryCount);

  const prepareToPlay = async () => {
    if (!player) return;
    try {
      const playerData = await player.getCurrentState();
      !playerData?.position ? play() : resume();
      dispatch(updatePlayState(true));
    } catch (error) {
      console.log(error);
    }
  };

  const play = async () => {
    if (!player) return;
    player.activateElement();
    const trackUris = tracks.map((track) => track.uri);
    const playerInstance = player;
    const {
      _options: { getOAuthToken },
    } = playerInstance;
    try {
      getOAuthToken(async () => {
        await axios.put(
          `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
          {
            uris: trackUris,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${getToken('accessToken')}`,
            },
          }
        );
      });
    } catch (error) {
      handlePlayerStateError({ error });
    }
  };

  const resume = () => {
    console.log('resume');
    player?.resume();
  };

  const handlePlayerStateError = ({ error }: PlayError) => {
    if (error instanceof AxiosError) {
      console.log('axios error');
      if (error.response?.status && error.response?.status >= 401) {
        setErrorMsg('트랙 재생을 재시도 중입니다.');
        retryCountRef.current += 1;
        setRetryCount(retryCountRef.current);
        setTimeout(retryPlay, 3000);
        dispatch(updateStatusMessage('트랙 재생을 재시도 중...'));
      }
    } else alert(error);
  };

  const retryPlay = () => {
    if (retryCountRef.current === 3) {
      setRetryCount(0);
      return dispatch(
        updateStatusMessage(
          '재생 재시도 횟수 초과. 다시 재생 버튼을 눌러주세요.'
        )
      );
    }
    play();
  };

  return [prepareToPlay, errorMsg];
};

export default usePlay;
