import axios from 'axios';
import React from 'react';
import { Cookies } from 'react-cookie';
import { TrackState } from '../pages/Settings';

interface TrackProps {
  track: TrackState;
}

const cookies = new Cookies();

function Track({ track }: TrackProps) {
  const setDibsTrack = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(track);
    const dibsTrack = {
      id: track.id,
      name: track.name,
      artist: track.artists.map((artist) => artist.name),
      artistId: track.artists[0].id,
      releaseDate: track.album.release_date,
      imageUrl: track.album.images[2].url,
    };
    const firebaseUid = cookies.get('F_UID');
    const accessToken = cookies.get('accessToken');
    const response = await axios.post('http://localhost:3001/tracks/add', {
      track: dibsTrack,
      accessToken: accessToken,
      firebaseUid: firebaseUid,
    });
  };
  return (
    <div>
      <img src={track.album.images[2].url} alt={track.name} />
      <h2>{track.name}</h2>
      <p>발매일 : {track.album.release_date}</p>
      <button onClick={setDibsTrack}>트랙 찜하기</button>
    </div>
  );
}

export default React.memo(Track);
