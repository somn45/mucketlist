import React from 'react';
import styled from 'styled-components';
import { TrackState } from '../pages/Home/TrackList/TrackList';

interface TempTrackProps {
  track: TrackState;
  playingTrack: string;
}

const TrackStyle = styled.div<{ isPlaying: boolean }>`
  width: 64px;
  height: 64px;
  border: ${(props) => (props.isPlaying ? '2px solid yellow' : null)};
  box-shadow: ${(props) => (props.isPlaying ? '1px 1px 1px 2px yellow' : null)};
  box-sizing: content-box;
`;

function TempTrack({ track, playingTrack }: TempTrackProps) {
  return (
    <TrackStyle isPlaying={track.name === playingTrack}>
      <img src={track.album.images[2].url} alt={track.name} />
    </TrackStyle>
  );
}

export default React.memo(TempTrack);
