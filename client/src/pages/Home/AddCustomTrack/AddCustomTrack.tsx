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
import requestAxios from '../../../utils/functions/requestAxios';
import { ICustomPlayList } from '../../CustomPlayList/CustomPlayList';

interface AddCustomTrackAxiosRequest {
  track: ICustomPlayList;
  firebaseUid: string;
  accessToken: string;
}

interface AddCustomTrackAxiosResponse {
  errorMsg: string;
}

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
    const accessToken = getToken('accessToken');
    const firebaseUid = getToken('firebaseUid');
    if (isArrayEmpty(tracks)) return;
    const track = tracks[playingPosition];
    const favoriteTrack = createFavoriteTrack(track);
    const requestAxiosParams = {
      method: 'post',
      url: 'http://localhost:3001/tracks/add',
      data: {
        track: favoriteTrack,
        accessToken,
        firebaseUid,
      },
    };
    const response = await requestAxios<
      AddCustomTrackAxiosRequest,
      AddCustomTrackAxiosResponse
    >(requestAxiosParams);
    if (response.status === 204) {
      updateStatusMessage(`${track.name}는 이미 찜한 트랙에 등록되었습니다.`);
    } else
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
    if (!recommendTrack) return;
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
