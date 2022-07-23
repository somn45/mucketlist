import React from 'react';
import Track from '../components/Track';
import { ITracks } from './Settings';

function Tracks({ tracks }: ITracks) {
  return (
    <div>
      {tracks.map((track) => (
        <Track key={track.id} track={track} />
      ))}
    </div>
  );
}

export default Tracks;
