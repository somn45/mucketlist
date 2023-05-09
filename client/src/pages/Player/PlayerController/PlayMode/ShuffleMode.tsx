import React, { useMemo } from 'react';
import { faShuffle } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import Icon from '../../../../components/Icon';
import {
  RootState,
  updatePlayMode,
} from '../../../../store/reducers/rootReducer';
import { useAppDispatch } from '../../../../store/store';
import { PlayModeButton } from '../../../../styles/player/playerStyle';
import {
  clearRepeatMode,
  clearShuffleMode,
  setShuffleMode,
} from '../../../../API';

function ShuffleMode() {
  const playMode = useSelector((state: RootState) => state.playMode);
  const dispatch = useAppDispatch();

  const handleShuffleMode = async () => {
    if (playMode === 'normal') {
      await setShuffleMode();
      dispatch(updatePlayMode('shuffle'));
    }
    if (playMode === 'repeat') {
      await clearRepeatMode();
      setShuffleMode();
      dispatch(updatePlayMode('shuffle'));
    }
    if (playMode === 'shuffle') {
      clearShuffleMode();
      dispatch(updatePlayMode('normal'));
    }
  };
  useMemo(() => handleShuffleMode, [playMode]);

  return (
    <PlayModeButton
      isShuffle={playMode === 'shuffle'}
      onClick={handleShuffleMode}
    >
      <Icon icon={faShuffle} />
    </PlayModeButton>
  );
}

export default React.memo(ShuffleMode);
