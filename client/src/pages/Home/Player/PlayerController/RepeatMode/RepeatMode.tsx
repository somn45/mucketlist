import { faRepeat } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Icon from '../../../../../components/Icon';
import {
  RootState,
  updatePlayMode,
} from '../../../../../store/reducers/rootReducer';
import { useAppDispatch } from '../../../../../store/store';

const RepeatButton = styled.button<{ isRepeat: boolean }>`
  opacity: ${(props) => (props.isRepeat ? 1 : 0.4)};
`;

function RepeatMode() {
  const playMode = useSelector((state: RootState) => state.playMode);
  const dispatch = useAppDispatch();
  const handleRepeatMode = () => {
    dispatch(updatePlayMode('repeat'));
    if (playMode === 'normal') dispatch(updatePlayMode('repeat'));
    else dispatch(updatePlayMode('normal'));
  };
  return (
    <RepeatButton isRepeat={playMode === 'repeat'} onClick={handleRepeatMode}>
      <Icon icon={faRepeat} />
    </RepeatButton>
  );
}

export default RepeatMode;
