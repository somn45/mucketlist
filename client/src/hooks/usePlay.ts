import { useState, useRef } from 'react';
import { AxiosError } from 'axios';
import {
  updatePlayState,
  updateStatusMessage,
} from '../store/reducers/rootReducer';
import { useAppDispatch } from '../store/store';
import { PlayError, playerType } from '../types/playerTypes/playerTypes';
import { ITrack } from '../types/trackTypes/trackTypes';
import { setPlayer } from '../API';

type usePlayProps = [() => Promise<void>, string];

const usePlay = (
  player: playerType,
  deviceId: string,
  tracks: ITrack[]
): usePlayProps => {
  const dispatch = useAppDispatch();
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
        setPlayer(deviceId, trackUris);
      });
    } catch (error) {
      handlePlayerStateError({ error });
    }
  };

  const resume = () => {
    player?.resume();
  };

  const handlePlayerStateError = ({ error }: PlayError) => {
    if (error instanceof AxiosError) {
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
