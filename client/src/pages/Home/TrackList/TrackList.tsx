import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import Track from '../../../components/Track';
import { RootState } from '../../../store/reducers/rootReducer';
import isArrayEmpty from '../../../utils/functions/isArrayEmpty';

export interface AlbumImage {
  height: number;
  url: string;
  width: number;
}

export interface Artist {
  name: string;
  id: string;
  external_urls: {
    spotify: string;
  };
}

export interface TrackState {
  id: string;
  name: string;
  popularity: number;
  artists: Artist[];
  album: {
    images: AlbumImage[];
    release_date: string;
  };
  uri: string;
}

export interface ITracks {
  tracks: TrackState[];
}

export interface TrackSeed {
  id: string;
  type: string;
}

export interface TrackData {
  tracks: TrackState[];
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
