import React, { useMemo } from 'react';
import { faRepeat } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import Icon from '../../../../components/Icon';
import {
  RootState,
  updatePlayMode,
} from '../../../../store/reducers/rootReducer';
import { useAppDispatch } from '../../../../store/store';
import { PlayModeButton } from '../../../../styles/player/playerStyle';
import { IPlayerContext } from '../../../../types/playerTypes/playerTypes';
import {
  clearRepeatMode,
  clearShuffleMode,
  setRepeatMode,
} from '../../../../API';

function RepeatMode() {
  const playMode = useSelector((state: RootState) => state.playMode);
  const dispatch = useAppDispatch();

  const handleRepeatMode = async () => {
    if (playMode === 'normal') {
      dispatch(updatePlayMode('repeat'));
      setRepeatMode();
    }
    if (playMode === 'shuffle') {
      dispatch(updatePlayMode('repeat'));
      await clearShuffleMode();
      setRepeatMode();
    }
    if (playMode === 'repeat') {
      dispatch(updatePlayMode('normal'));
      clearRepeatMode();
    }
  };
  useMemo(() => handleRepeatMode, [playMode]);

  return (
    <PlayModeButton isRepeat={playMode === 'repeat'} onClick={handleRepeatMode}>
      <Icon icon={faRepeat} />
    </PlayModeButton>
  );
}

export default React.memo(RepeatMode);
