import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

import MoveHomeButton from './MoveHomeButton/MoveHomeButton';
import CustomTrackListTitle from './Title/CustomTrackListTitle';
import CustomTrackItem from '../../components/CustomTrackItem';
import styled from 'styled-components';
import { Modal } from '../../styles/modal/modalStyle';
import { useMediaQuery } from 'react-responsive';
import ResponsedTrackList from './TrackList/ResponsedTrackList';
import CustomTrackHeader from './Header/CustomTrackHeader';
import CustomTrackListWrap from './Wrap/CustomTrackListWrap';
import { MOBILE_SIZE, WIDE_SCREEN_SIZE } from '../../constants/constants';

export interface ICustomPlayList {
  name: string;
  id: string;
  artists: string[];
  genres: string[];
  artistId: string;
  releaseDate: string;
  image: string;
}

interface IOutletContext {
  isLoading: boolean;
  isError: boolean;
  customTracks: ICustomPlayList[];
  error: unknown;
}

function CustomTrackList() {
  const navigate = useNavigate();
  const { isLoading, isError, customTracks, error } =
    useOutletContext<IOutletContext>();
  const isMobile = useMediaQuery({
    query: MOBILE_SIZE,
  });
  const isWideScreen = useMediaQuery({
    query: WIDE_SCREEN_SIZE,
  });

  if (isLoading) <div>찜한 트랙 목록 로딩 중...</div>;

  return (
    <CustomTrackListWrap>
      <CustomTrackHeader>
        <CustomTrackListTitle text="찜한 플레이리스트" />
        <MoveHomeButton value="X" onClick={() => navigate('/')} />
      </CustomTrackHeader>
      <ResponsedTrackList
        customTracks={customTracks}
        isMobile={isMobile}
        isWideScreen={isWideScreen}
      />
    </CustomTrackListWrap>
  );
}

export default React.memo(CustomTrackList);
