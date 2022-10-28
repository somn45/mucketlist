import { useSelector } from 'react-redux';
import TempTrack from '../../../components/TempTrack';
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
  const tracks = useSelector((state: RootState) => state.tracks);
  return (
    <>
      {!isArrayEmpty(tracks) &&
        tracks.map((track) => (
          <TempTrack
            key={track.id}
            track={track}
            playingTrack={tracks[playingPosition].name}
          />
        ))}
    </>
  );
}

export default TrackList;
