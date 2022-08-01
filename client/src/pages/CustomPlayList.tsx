import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Track from '../components/Track';

interface CustomPlayList {
  name: string;
  id: string;
  artistId: string;
}

function CustomPlayList() {
  const navigate = useNavigate();
  const cookies = new Cookies();
  useEffect(() => {
    getCustomPlayList();
  }, []);
  const [tracks, setTracks] = useState<CustomPlayList[]>([]);

  const getCustomPlayList = async () => {
    const firebaseUid = cookies.get('F_UID');
    const response = await axios.get(
      `http://localhost:3001/track/read?firebaseUid=${firebaseUid}`
    );
    setTracks(response.data.tracks);
  };

  return (
    <div>
      <h2>찜한 플레이리스트</h2>
      <button onClick={() => navigate('/')}>X</button>
      {tracks.map((track) => (
        <h2 key={track.id}>{track.name}</h2>
      ))}
    </div>
  );
}

export default CustomPlayList;
