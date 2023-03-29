import {
  PlayerTrackImage as StyledPlayerTrackImage,
  DefaultImage,
} from '../../../styles/player/playerStyle';
import { PlayerInfo } from '../../../types/playerTypes/playerTypes';

function PlayerTrackImage({ trackName, trackImage }: PlayerInfo) {
  return trackImage ? (
    <StyledPlayerTrackImage src={trackImage} alt={trackName} />
  ) : (
    <DefaultImage></DefaultImage>
  );
}

export default PlayerTrackImage;
