import styled from 'styled-components';
import axios from 'axios';
import { connect, useDispatch } from 'react-redux';
import { Cookies } from 'react-cookie';
import AddCustomTrackButton from './AddCustomTrackButton/AddCustomTrackButton';
import { TrackState } from '../TrackList/TrackList';
import getTokens from '../../../utils/functions/getTokens';

interface AddCustomTrackStates {
  playback: {
    playingPosition: number;
    playMode: string;
  };
  tracks: TrackState[];
}

const AddCustomTrackWrap = styled.div`
  width: 46px;
  height: 46px;
  background-color: #7fffd4;
  border: 3px solid #ff5474;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  right: 10px;
  bottom: 90px;
`;

const cookies = new Cookies();

function AddCustomTrack({ playback, tracks }: AddCustomTrackStates) {
  console.log(playback);

  const addCustomTrack = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const track = tracks[playback.playingPosition];
    const dibsTrack = {
      name: track.name,
      id: track.id,
      artists: track.artists.map((artist) => artist.name),
      artistId: track.artists[0].id,
      release_date: track.album.release_date,
      image: track.album.images[2].url,
    };
    const firebaseUid = cookies.get('firebaseUid');
    const response = await axios.post('http://localhost:3001/tracks/add', {
      track: dibsTrack,
      accessToken: getTokens(),
      firebaseUid: firebaseUid,
    });
    if (response.data.errorMsg) console.log(response.data.errorMsg);
  };
  return (
    <AddCustomTrackWrap>
      <AddCustomTrackButton onClick={addCustomTrack} />
    </AddCustomTrackWrap>
  );
}

function mapStateToProps(state: AddCustomTrackStates) {
  return {
    playback: state.playback,
    tracks: state.tracks,
  };
}

export default connect(mapStateToProps)(AddCustomTrack);
