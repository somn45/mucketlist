import React from 'react';
import { TrackState } from '../pages/Settings';

interface TrackProps {
  track: TrackState;
}

function Track({ track }: TrackProps) {
  return (
    <div>
      <img src={track.album.images[2].url} alt={track.name} />
      <h2>{track.name}</h2>
      <p>{track.album.release_date}</p>
    </div>
  );
}

export default Track;