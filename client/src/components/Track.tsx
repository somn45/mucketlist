import React from 'react';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';

import { ITrack } from '../types/trackTypes/trackTypes';

import { PlayerInfo } from '../types/playerTypes/playerTypes';
interface TrackComponentProps {
  track: ITrack;
  playingTrack: PlayerInfo;
}

const TrackStyle = styled.div<{ isPlaying: boolean }>`
  border: ${(props) => (props.isPlaying ? '2px solid yellow' : null)};
  box-shadow: ${(props) => (props.isPlaying ? '1px 1px 1px 2px yellow' : null)};
  box-sizing: content-box;
`;

const MobileTrackStyle = styled(TrackStyle)`
  width: 48px;
  height: 48px;
  img {
    width: 48px;
    height: 48px;
  }
`;

const TabletListTrackStyle = styled(TrackStyle)`
  width: 64px;
  height: 64px;
  img {
    width: 64px;
    height: 64px;
  }
`;

function Track({ track, playingTrack }: TrackComponentProps) {
  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });
  return (
    <>
      {isMobile ? (
        <MobileTrackStyle isPlaying={track.name === playingTrack.trackName}>
          <img src={track.album.images[2].url} alt={track.name} />
        </MobileTrackStyle>
      ) : (
        <TabletListTrackStyle isPlaying={track.name === playingTrack.trackName}>
          <img src={track.album.images[2].url} alt={track.name} />
        </TabletListTrackStyle>
      )}
    </>
  );
}

export default React.memo(Track);
