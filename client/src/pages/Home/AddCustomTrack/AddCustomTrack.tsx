import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Cookies } from 'react-cookie';
import AddCustomTrackButton from './AddCustomTrackButton/AddCustomTrackButton';
import getTokens from '../../../utils/functions/getTokens';
import {
  addTrack,
  RootState,
  updateStatusMessage,
} from '../../../store/reducers/rootReducer';
import Wrap from './Wrap/AddCustomTrackWrap';
import isArrayEmpty from '../../../utils/functions/isArrayEmpty';
import { getRecommendTrack } from '../../../store/reducers/thunk/recommendTrack';
import { ICustomPlayList } from '../../CustomPlayList/CustomPlayList';
import { useAppDispatch } from '../../../store/store';

const cookies = new Cookies();

function AddCustomTrack() {
  const tracks = useSelector((state: RootState) => state.tracks);
  const playingPosition = useSelector(
    (state: RootState) => state.playingPosition
  );
  const selectedGenres = useSelector(
    (state: RootState) => state.selectedGenres
  );
  const recommendTrackState = useSelector(
    (state: RootState) => state.recommendTrack
  );
  const recommendTrack = useSelector(
    (state: RootState) => state.recommendTrack.track
  );
  const dispatch = useAppDispatch();
  console.log(recommendTrackState);
  console.log(tracks.length);

  const addCustomTrack = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isArrayEmpty(tracks)) return;
    const track = tracks[playingPosition];
    const dibsTrack = {
      name: track.name,
      id: track.id,
      artists: track.artists.map((artist) => artist.name),
      artistId: track.artists[0].id,
      genres: selectedGenres,
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
    else dispatch(updateStatusMessage(`${track.name} 찜한 트랙 리스트 추가`));
    addNewTrack(dibsTrack);
  };

  const addNewTrack = (track: ICustomPlayList) => {
    dispatch(getRecommendTrack(track));
    filterDuplicatedTrack();
  };

  const filterDuplicatedTrack = () => {
    const duplicatedTrack = tracks.filter(
      (track) => track.id === recommendTrack?.id
    );
    if (!recommendTrack) return;
    if (duplicatedTrack.length > 0) {
      return;
    } else {
      dispatch(addTrack(recommendTrack));
    }
  };

  return (
    <Wrap>
      <AddCustomTrackButton onClick={addCustomTrack} />
    </Wrap>
  );
}

export default React.memo(AddCustomTrack);
