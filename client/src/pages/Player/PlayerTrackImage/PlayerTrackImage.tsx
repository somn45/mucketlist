import { PlayerTrackImage as StyledPlayerTrackImage } from '../../../styles/player/playerStyle';
import { PlayerInfo } from '../../../types/playerTypes/playerTypes';

function PlayerTrackImage({ playingTrack, trackImage }: PlayerInfo) {
  return <StyledPlayerTrackImage src={trackImage} alt={playingTrack} />;
}

export default PlayerTrackImage;
