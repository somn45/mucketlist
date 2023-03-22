import { ArtistName, TrackName } from '../../../styles/player/playerStyle';
import { PlayerInfo } from '../../../types/playerTypes/playerTypes';

function PlayerTrackInfo({ playingTrack, artist }: PlayerInfo) {
  return (
    <>
      <TrackName>{playingTrack}</TrackName>
      <ArtistName>{artist}</ArtistName>
    </>
  );
}

export default PlayerTrackInfo;
