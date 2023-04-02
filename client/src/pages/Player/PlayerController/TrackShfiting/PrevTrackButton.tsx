import React, { useMemo } from 'react';
import { faBackwardStep } from '@fortawesome/free-solid-svg-icons';

import { IPlayer } from '../../../../types/playerTypes/playerTypes';

import Icon from '../../../../components/Icon';

function PrevTrackButton({ player }: IPlayer) {
  const onPreviousTrack = () => {
    if (!player) return;
    player.previousTrack();
  };
  useMemo(() => onPreviousTrack, []);

  return (
    <button onClick={onPreviousTrack}>
      <Icon icon={faBackwardStep} />
    </button>
  );
}

export default React.memo(PrevTrackButton);
