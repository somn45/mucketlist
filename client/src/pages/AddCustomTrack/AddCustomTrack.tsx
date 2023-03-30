import React, { useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { useSelector } from 'react-redux';
import { useMutation } from 'react-query';
import { queryClient } from '../..';
import { useMediaQuery } from 'react-responsive';

import AddCustomTrackWrap from './Wrap/AddCustomTrackWrap';
import AddCustomTrackButton from './Button/AddCustomTrackButton';

import { ITrack } from '../../types/trackTypes/trackTypes';
import { ICustomTrack } from '../../types/trackTypes/trackTypes';

import {
  addTrack,
  RootState,
  updateStatusMessage,
} from '../../store/reducers/rootReducer';
import { useAppDispatch } from '../../store/store';
import isArrayEmpty from '../../utils/functions/isArrayEmpty';
import getToken from '../../utils/functions/getToken';
import { MOBILE_SIZE, SERVER_ENDPOINT } from '../../constants/constants';

interface AddCustomTrackAxiosResponse {
  errorMsg: string;
}

function AddCustomTrack() {
  const tracks = useSelector((state: RootState) => state.tracks);
  const { playingTrack, playingPosition, selectedGenres } = useSelector(
    (state: RootState) => state
  );
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery({
    query: MOBILE_SIZE,
  });

  const requestAddCustomTrack = async (track: ITrack) => {
    const accessToken = getToken('accessToken');
    const firebaseUid = getToken('firebaseUid');
    if (isArrayEmpty(tracks)) return;
    const favoriteTrack = createFavoriteTrack(track);
    const requestAddCustomTrackData = {
      track: favoriteTrack,
      accessToken,
      firebaseUid,
    };
    try {
      const { data } = await axios.post<AddCustomTrackAxiosResponse>(
        `${SERVER_ENDPOINT}/tracks/add`,
        requestAddCustomTrackData
      );
      dispatch(
        updateStatusMessage(
          `${track.name}이 찜한 트랙 리스트에 추가되었습니다.`
        )
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
      }
    }
  };

  const addCustomTrack = useMutation(
    (track: ITrack) => requestAddCustomTrack(track),
    {
      onMutate: async () => {},
      onSuccess: (customTrack?: AddCustomTrackAxiosResponse) => {
        queryClient.cancelQueries('customTracks');

        const previousCustomTracks = queryClient.getQueryData(
          'customTracks'
        ) as ICustomTrack[];
        if (previousCustomTracks) {
          queryClient.setQueryData('customTracks', [
            ...previousCustomTracks,
            customTrack,
          ]);
        } else queryClient.setQueryData('customTracks', customTrack);
      },
      onError: (error: unknown) => {
        console.log(error);
      },
      onSettled: () => {
        queryClient.invalidateQueries('customTracks');
      },
    }
  );

  const createFavoriteTrack = (track: ITrack) => {
    return {
      name: track.name,
      id: track.id,
      artists: track.artists.map((artist) => artist.name),
      artistId: track.artists[0].id,
      genres: selectedGenres,
      releaseDate: track.album.release_date,
      image: track.album.images[2].url,
    };
  };

  return (
    <AddCustomTrackWrap isMobile={isMobile}>
      <AddCustomTrackButton
        onClick={() =>
          addCustomTrack.mutate(
            tracks.filter((track) => track.name === playingTrack.trackName)[0]
          )
        }
      />
    </AddCustomTrackWrap>
  );
}

export default React.memo(AddCustomTrack);
