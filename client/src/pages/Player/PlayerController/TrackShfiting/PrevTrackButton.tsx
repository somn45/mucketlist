import { faBackwardStep } from '@fortawesome/free-solid-svg-icons';

import { IPlayer } from '../../../../types/playerTypes/playerTypes';

import Icon from '../../../../components/Icon';
import {
  movePreviousPosition,
  updatePlayState,
} from '../../../../store/reducers/rootReducer';
import { useAppDispatch } from '../../../../store/store';

interface PrevTrackButton extends IPlayer {
  clearProgress: React.Dispatch<React.SetStateAction<number>>;
}

function PrevTrackButton({ player, clearProgress }: PrevTrackButton) {
  const dispatch = useAppDispatch();

  const onPreviousTrack = () => {
    if (!player) return;
    clearProgress(0);
    dispatch(movePreviousPosition());
    dispatch(updatePlayState(true));
  };

  return (
    <button onClick={onPreviousTrack}>
      <Icon icon={faBackwardStep} />
    </button>
  );
}

export default PrevTrackButton;
