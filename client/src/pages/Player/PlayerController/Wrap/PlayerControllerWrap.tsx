import { PlayerControllerWrap as StyledPlayerControllerWrap } from '../../../../styles/player/playerStyle';
import { IChildren } from '../../../../types/moduleTypes/moduleTypes';

function PlayerControllerWrap({ children }: IChildren) {
  return <StyledPlayerControllerWrap>{children}</StyledPlayerControllerWrap>;
}

export default PlayerControllerWrap;
