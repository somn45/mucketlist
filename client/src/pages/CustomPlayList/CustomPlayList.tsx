import React, { useEffect } from 'react';
import { Cookies } from 'react-cookie';
import { useNavigate, useOutletContext } from 'react-router-dom';

import CustomPlayListTitle from './Title/CustomPlayListTitle';
import CloseButton from './CloseButton/CloseButton';
import CustomTrackItem from '../../components/CustomTrackItem';
import styled from 'styled-components';
import { Modal } from '../../utils/styles/Modal';
import { useAppDispatch } from '../../store/store';
import { getCustomTracks } from '../../store/reducers/thunk/customTracks';
import isArrayEmpty from '../../utils/functions/isArrayEmpty';
import { useMediaQuery } from 'react-responsive';

export interface ICustomPlayList {
  name: string;
  id: string;
  artists: string[];
  genres: string[];
  artistId: string;
  release_date: string;
  image: string;
}

interface IOutletContext {
  customTracks: ICustomPlayList[];
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

const cookies = new Cookies();

function CustomPlayList() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { customTracks } = useOutletContext<IOutletContext>();
  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });
  const isWideScreen = useMediaQuery({
    query: '(min-width: 1440px)',
  });

  useEffect(() => {
    if (!isArrayEmpty(customTracks)) return;
    getCustomPlayList();
  }, []);

  const getCustomPlayList = async () => {
    const firebaseUid = cookies.get('firebaseUid');
    dispatch(getCustomTracks(firebaseUid));
  };

  const CustomTrackItemMaps = customTracks
    ? customTracks.map((track: ICustomPlayList) => (
        <CustomTrackItem key={track.id} track={track} />
      ))
    : null;
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
