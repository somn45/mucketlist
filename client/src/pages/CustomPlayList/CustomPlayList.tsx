import { useEffect, useState } from 'react';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import CustomPlayListTitle from './Title/CustomPlayListTitle';
import CloseButton from './CloseButton/CloseButton';
import CustomTrackItem from '../../components/CustomTrackItem';
import styled from 'styled-components';

export interface ICustomPlayList {
  name: string;
  id: string;
  artistId: string;
}

const Wrap = styled.div`
  background-color: white;
`;

const cookies = new Cookies();

function CustomPlayList() {
  const navigate = useNavigate();
  const [tracks, setTracks] = useState<ICustomPlayList[]>([]);
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
    <div>
      <CustomPlayListTitle text="찜한 플레이리스트" />
      <CloseButton value="X" onClick={() => navigate('/')} />
      {tracks.map((track) => (
        <CustomTrackItem key={track.id} track={track} />
      ))}
    </div>
  );
}

export default CustomPlayList;
