import React, { useMemo } from 'react';
import { faForwardStep } from '@fortawesome/free-solid-svg-icons';

import { IPlayer } from '../../../../types/playerTypes/playerTypes';

import Icon from '../../../../components/Icon';

function NextTrackButton({ player }: IPlayer) {
  const onNextTrack = () => {
    if (!player) return;
    player.nextTrack();
  };
  useMemo(() => onNextTrack, []);

  return (
    <button onClick={onNextTrack}>
      <Icon icon={faForwardStep} />
    </button>
  );
}

export default React.memo(NextTrackButton);
