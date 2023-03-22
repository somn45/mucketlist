import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import Track from '../../components/Track';

import { RootState } from '../../store/reducers/rootReducer';
import { ITrack } from '../../types/trackTypes/trackTypes';

import isArrayEmpty from '../../utils/functions/isArrayEmpty';

export interface TrackSeed {
  id: string;
  type: string;
}

export interface TrackData {
  tracks: ITrack[];
  seeds: TrackSeed[];
}

function TrackList() {
  const playingPosition = useSelector(
    (state: RootState) => state.playingPosition
  );
  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });
  const isTablet = useMediaQuery({
    query: '(max-width: 1023px)',
  });
  const tracks = useSelector((state: RootState) => state.tracks);

  const displayedTracks = isMobile
    ? tracks.slice(0, 40)
    : isTablet
    ? tracks.slice(0, 70)
    : tracks.slice(0, 100);
  return (
    <>
      {!isArrayEmpty(tracks) &&
        displayedTracks.map((track) => (
          <Track
            key={track.id}
            track={track}
            playingTrack={tracks[playingPosition].name}
          />
        ))}
    </>
  );
}

export default TrackList;
