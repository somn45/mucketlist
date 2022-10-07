import { connect } from 'react-redux';
import TempTrack from '../../../components/atom/TempTrack';
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

function TrackList({ tracks }: ITracks) {
  return (
    <>
      {!isArrayEmpty(tracks) &&
        tracks.map((track) => <TempTrack key={track.id} track={track} />)}
    </>
  );
}

function mapStateToProps(state: ITracks) {
  return {
    tracks: state.tracks,
  };
}

export default connect(mapStateToProps)(TrackList);
