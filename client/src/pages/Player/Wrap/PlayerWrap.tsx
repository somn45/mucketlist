import { playerWrap as StyledPlayerWrap } from '../../../styles/player/playerStyle';
import { IChildren } from '../../../types/moduleTypes/moduleTypes';

interface PlayerWrapProps extends IChildren {
  isPlay: boolean;
}

function PlayerWrap({ children, isPlay }: PlayerWrapProps) {
  return <StyledPlayerWrap isPlay={isPlay}>{children}</StyledPlayerWrap>;
}

export default PlayerWrap;
