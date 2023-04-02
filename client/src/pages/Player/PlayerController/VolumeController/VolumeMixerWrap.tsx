import React from 'react';
import { VolumeMixerWrap as StyledVolumeMixerWrap } from '../../../../styles/player/playerStyle';
import { IChildren } from '../../../../types/moduleTypes/moduleTypes';

interface VolumeMixerProps extends IChildren {
  onMouseEnter: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave: React.MouseEventHandler<HTMLDivElement>;
}

function VolumeMixerWrap({
  children,
  onMouseEnter,
  onMouseLeave,
}: VolumeMixerProps) {
  return (
    <StyledVolumeMixerWrap
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </StyledVolumeMixerWrap>
  );
}

export default React.memo(VolumeMixerWrap);
