import { faShuffle } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Icon from '../../../../../components/Icon';
import {
  RootState,
  updatePlayMode,
} from '../../../../../store/reducers/rootReducer';
import { useAppDispatch } from '../../../../../store/store';

const ShuffleButton = styled.button<{ isShuffle: boolean }>`
  opacity: ${(props) => (props.isShuffle ? 1 : 0.4)};
`;

function ShuffleMode() {
  const playMode = useSelector((state: RootState) => state.playMode);
  const dispatch = useAppDispatch();

  const handleShuffleMode = async () =>
    playMode === 'normal'
      ? dispatch(updatePlayMode('shuffle'))
      : dispatch(updatePlayMode('normal'));

  return (
    <ShuffleButton
      isShuffle={playMode === 'shuffle'}
      onClick={handleShuffleMode}
    >
      <Icon icon={faShuffle} />
    </ShuffleButton>
  );
}

export default ShuffleMode;
