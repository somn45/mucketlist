import { ArtistName, TrackName } from '../../../styles/player/playerStyle';
import { PlayerInfo } from '../../../types/playerTypes/playerTypes';

function PlayerTrackInfo({ trackName, artist }: PlayerInfo) {
  return (
    <>
      <TrackName>{trackName}</TrackName>
      <ArtistName>{artist}</ArtistName>
    </>
  );
}

export default PlayerTrackInfo;
