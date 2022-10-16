import { useEffect, useState } from 'react';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import CustomPlayListTitle from './Title/CustomPlayListTitle';
import CloseButton from './CloseButton/CloseButton';
import CustomTrackItem from '../../components/CustomTrackItem';
import styled from 'styled-components';
import { Modal } from '../../utils/styles/Modal';
import isArrayEmpty from '../../utils/functions/isArrayEmpty';

export interface ICustomPlayList {
  name: string;
  id: string;
  artists: string[];
  genres: string[];
  artistId: string;
  release_date: string;
  image: string;
}

const Wrap = styled(Modal)`
  padding: 30px 10px 0;
  color: white;
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

const cookies = new Cookies();

function CustomPlayList() {
  const navigate = useNavigate();
  const [tracks, setTracks] = useState<ICustomPlayList[]>([]);
  console.log(tracks);
  useEffect(() => {
    getCustomPlayList();
  }, []);
  const getCustomPlayList = async () => {
    const firebaseUid = cookies.get('firebaseUid');
    console.log('custom track');
    const response = await axios.get(
      `http://localhost:3001/tracks/read?firebaseUid=${firebaseUid}`
    );
    setTracks(response.data.tracks);
  };
  return (
    <Wrap>
      <CustomTrackHeader>
        <CustomPlayListTitle text="찜한 플레이리스트" />
        <CloseButton value="X" onClick={() => navigate('/')} />
      </CustomTrackHeader>
      <CustomTrackList>
        {tracks
          ? tracks.map((track) => (
              <CustomTrackItem key={track.id} track={track} />
            ))
          : null}
      </CustomTrackList>
    </Wrap>
  );
}

export default CustomPlayList;
