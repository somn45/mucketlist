import React from 'react';
import styled from 'styled-components';
import { TrackState } from '../pages/Home/TrackList/TrackList';

interface TrackComponentProps {
  track: TrackState;
  playingTrack: string;
}

const TrackStyle = styled.div<{ isPlaying: boolean }>`
  width: 48px;
  height: 48px;
  border: ${(props) => (props.isPlaying ? '2px solid yellow' : null)};
  box-shadow: ${(props) => (props.isPlaying ? '1px 1px 1px 2px yellow' : null)};
  box-sizing: content-box;
  img {
    width: 48px;
    height: 48px;
  }
`;

function Track({ track, playingTrack }: TrackComponentProps) {
  return (
    <TrackStyle isPlaying={track.name === playingTrack}>
      <img src={track.album.images[2].url} alt={track.name} />
    </TrackStyle>
  );
}

export default React.memo(Track);
