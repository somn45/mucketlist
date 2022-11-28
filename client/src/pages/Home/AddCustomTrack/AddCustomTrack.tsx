import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import AddCustomTrackButton from './AddCustomTrackButton/AddCustomTrackButton';
import getToken from '../../../utils/functions/getToken';
import {
  addTrack,
  RootState,
  updateStatusMessage,
} from '../../../store/reducers/rootReducer';
import Wrap from './Wrap/AddCustomTrackWrap';
import isArrayEmpty from '../../../utils/functions/isArrayEmpty';
import { getRecommendTrack } from '../../../store/reducers/thunk/recommendTrack';
import { useAppDispatch } from '../../../store/store';
import { TrackState } from '../TrackList/TrackList';

const ACCESS_TOKEN = getToken('accessToken');
const FIREBASE_UID = getToken('firebaseUid');

function AddCustomTrack() {
  const tracks = useSelector((state: RootState) => state.tracks);
  const { playingPosition, selectedGenres } = useSelector(
    (state: RootState) => state
  );
  const recommendTrack = useSelector(
    (state: RootState) => state.recommendTrack.track
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!recommendTrack) return;
    checkDuplicatedTrack();
  }, [recommendTrack]);

  const addCustomTrack = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isArrayEmpty(tracks)) return;
    const track = tracks[playingPosition];
    const favoriteTrack = createFavoriteTrack(track);
    const response = await axios.post('http://localhost:3001/tracks/add', {
      track: favoriteTrack,
      accessToken: ACCESS_TOKEN,
      firebaseUid: FIREBASE_UID,
    });
    if (response.data.errorMsg) console.log(response.data.errorMsg);
    else
      dispatch(
        updateStatusMessage(
          `${track.name}이 찜한 트랙 리스트에 추가되었습니다.`
        )
      );
    dispatch(getRecommendTrack(favoriteTrack));
  };

  const createFavoriteTrack = (track: TrackState) => {
    return {
      name: track.name,
      id: track.id,
      artists: track.artists.map((artist) => artist.name),
      artistId: track.artists[0].id,
      genres: selectedGenres,
      release_date: track.album.release_date,
      image: track.album.images[2].url,
    };
  };

  const checkDuplicatedTrack = () => {
    const duplicatedTrack = tracks.filter(
      (track) => track.id === recommendTrack?.id
    );
    if (duplicatedTrack.length < 1) dispatch(addTrack(recommendTrack));
  };

  return (
    <Wrap>
      <AddCustomTrackButton onClick={addCustomTrack} />
    </Wrap>
  );
}

export default React.memo(AddCustomTrack);
