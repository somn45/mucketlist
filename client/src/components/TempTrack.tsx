import axios from 'axios';
import { Cookies } from 'react-cookie';
import React from 'react';
import { TrackState } from '../pages/Home/TrackList/TrackList';

interface TempTrackProps {
  track: TrackState;
}

const cookies = new Cookies();

function TempTrack({ track }: TempTrackProps) {
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
    </div>
  );
}

export default React.memo(TempTrack);

/*
      <Span text={track.name} />
      <Span text={`발매일 : ${track.album.release_date}`} />
      <Span text={`음원 순위 : ${track.popularity}`} />
      <Button value="트랙 찜하기" onClick={setDibsTrack} />
*/
