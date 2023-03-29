import { PlayerColumn as StyledPlayerColumn } from '../../../styles/player/playerStyle';
import { IChildren } from '../../../types/moduleTypes/moduleTypes';

function PlayerColumn({ children }: IChildren) {
  return <StyledPlayerColumn>{children}</StyledPlayerColumn>;
}

export default PlayerColumn;
