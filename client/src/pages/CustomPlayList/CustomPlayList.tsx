import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

import CustomPlayListTitle from './Title/CustomPlayListTitle';
import CloseButton from './CloseButton/CloseButton';
import CustomTrackItem from '../../components/CustomTrackItem';
import styled from 'styled-components';
import { Modal } from '../../utils/styles/Modal';
import { useMediaQuery } from 'react-responsive';
import isArrayEmpty from '../../utils/functions/isArrayEmpty';

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

const Wrap = styled(Modal)`
  padding: 30px 10px 0;
  color: white;
  overflow: auto;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const CustomTrackHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CustomTrackList = styled.ul`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
`;

const CustomTrackTwoColumnsList = styled.ul`
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(auto-fill, 1fr);
  gap: 10px;
`;

const CustomTrackThreeColumnsList = styled.ul`
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(auto-fill, 1fr);
  gap: 10px;
`;

function CustomPlayList() {
  const navigate = useNavigate();
  const { isLoading, isError, customTracks, error } =
    useOutletContext<IOutletContext>();
  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });
  const isWideScreen = useMediaQuery({
    query: '(min-width: 1440px)',
  });

  const CustomTrackItemMaps = !isArrayEmpty(customTracks) ? (
    customTracks.map((track: ICustomPlayList) => (
      <CustomTrackItem key={track.id} track={track} />
    ))
  ) : (
    <span>찜한 트랙 목록이 존재하지 않습니다..</span>
  );

  if (isLoading) <div>찜한 트랙 목록 로딩 중...</div>;

  return (
    <Wrap>
      <CustomTrackHeader>
        <CustomPlayListTitle text="찜한 플레이리스트" />
        <CloseButton value="X" onClick={() => navigate('/')} />
      </CustomTrackHeader>
      {isMobile ? (
        <CustomTrackList>{CustomTrackItemMaps}</CustomTrackList>
      ) : isWideScreen ? (
        <CustomTrackThreeColumnsList>
          {CustomTrackItemMaps}
        </CustomTrackThreeColumnsList>
      ) : (
        <CustomTrackTwoColumnsList>
          {CustomTrackItemMaps}
        </CustomTrackTwoColumnsList>
      )}
    </Wrap>
  );
}

export default React.memo(CustomPlayList);
