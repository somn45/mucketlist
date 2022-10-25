import styled from 'styled-components';
import axios from 'axios';
import { connect, useDispatch } from 'react-redux';
import { Cookies } from 'react-cookie';
import AddCustomTrackButton from './AddCustomTrackButton/AddCustomTrackButton';
import { TrackState } from '../TrackList/TrackList';
import getTokens from '../../../utils/functions/getTokens';
import { updateStatusMessage } from '../../../store/reducers/rootReducer';
import Wrap from './Wrap/AddCustomTrackWrap';

interface AddCustomTrackStates {
  playback: {
    playingPosition: number;
    playMode: string;
  };
  tracks: TrackState[];
}

const cookies = new Cookies();

function AddCustomTrack({ playback, tracks }: AddCustomTrackStates) {
  const dispatch = useDispatch();

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
    else
      dispatch(
        updateStatusMessage(
          `${track.name}이 찜한 트랙 리스트에 추가되었습니다.`
        )
      );
  };
  return (
    <Wrap>
      <AddCustomTrackButton onClick={addCustomTrack} />
    </Wrap>
  );
}

function mapStateToProps(state: AddCustomTrackStates) {
  return {
    playback: state.playback,
    tracks: state.tracks,
  };
}

export default connect(mapStateToProps)(AddCustomTrack);
