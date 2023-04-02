import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';

import { ITrack } from '../types/trackTypes/trackTypes';

import { MOBILE_SIZE } from '../constants/constants';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducers/rootReducer';
interface TrackComponentProps {
  track: ITrack;
}

const TrackStyle = styled.div<{ isPlaying?: boolean }>`
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

function Track({ track }: TrackComponentProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const { playingTrack } = useSelector((state: RootState) => state);
  const isMobile = useMediaQuery({
    query: MOBILE_SIZE,
  });

  useEffect(() => {
    if (track.name === playingTrack.trackName) setIsPlaying(true);
    else setIsPlaying(false);
  }, [playingTrack]);

  return (
    <>
      {isMobile ? (
        <MobileTrackStyle isPlaying={isPlaying}>
          <img src={track.album.images[2].url} alt={track.name} />
        </MobileTrackStyle>
      ) : (
        <TabletListTrackStyle isPlaying={isPlaying}>
          <img src={track.album.images[2].url} alt={track.name} />
        </TabletListTrackStyle>
      )}
    </>
  );
}

export default React.memo(Track);
