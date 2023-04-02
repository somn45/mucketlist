import React from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import Track from '../../components/Track';
import { IPlayingTrack } from '../../store/reducers/playingTrack';

import { RootState } from '../../store/reducers/rootReducer';

import isArrayEmpty from '../../utils/functions/isArrayEmpty';

function TrackList() {
  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });
  const isTablet = useMediaQuery({
    query: '(max-width: 1023px)',
  });
  const { tracks } = useSelector((state: RootState) => state);

  const displayedTracks = isMobile
    ? tracks.slice(0, 40)
    : isTablet
    ? tracks.slice(0, 70)
    : tracks.slice(0, 100);
  return (
    <>
      {!isArrayEmpty(tracks) &&
        displayedTracks.map((track) => <Track key={track.id} track={track} />)}
    </>
  );
}

export default React.memo(TrackList);
