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
import { useMutation } from 'react-query';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import styled, { keyframes } from 'styled-components';
import Icon from '../../../components/Icon';
import { queryClient } from '../../..';

interface AddCustomTrackAxiosRequest {
  track: ICustomPlayList;
  firebaseUid: string;
  accessToken: string;
}

interface AddCustomTrackAxiosResponse {
  errorMsg: string;
}

const TransisionAddCustomTrackButton = keyframes`
  0% {
    width: 20px;
    height: 20px;
    color: #fe3fcb;
  } 60% {
    width: 25px;
    height: 25px;
    color: #fe3fcb;
  } 100% {
    width: 25px;
    height: 25px;
    color: #E93636;
  }
`;

const AddCustomTrackButtonStyle = styled.button`
  width: 32px;
  height: 32px;
  padding: 7px;
  box-sizing: content-box;
  &:hover {
    svg {
      animation: ${TransisionAddCustomTrackButton} 1.2s ease forwards;
    }
  }
  svg {
    width: 22px;
    height: 22px;
    color: #fe3fcb;
  }
`;

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

  const requestAddCustomTrack = async (track: TrackState) => {
    const accessToken = getToken('accessToken');
    const firebaseUid = getToken('firebaseUid');
    if (isArrayEmpty(tracks)) return;
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
    const { data } = await requestAxios<
      AddCustomTrackAxiosRequest,
      AddCustomTrackAxiosResponse
    >(requestAxiosParams);
    dispatch(
      updateStatusMessage(`${track.name}이 찜한 트랙 리스트에 추가되었습니다.`)
    );
    dispatch(getRecommendTrack(favoriteTrack));
    return data;
  };

  const addCustomTrack = useMutation(
    (track: TrackState) => requestAddCustomTrack(track),
    {
      onMutate: async () => {},
      onSuccess: (customTrack?: AddCustomTrackAxiosResponse) => {
        queryClient.cancelQueries('customTracks');

        const previousCustomTracks = queryClient.getQueryData(
          'customTracks'
        ) as ICustomPlayList[];
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

  const createFavoriteTrack = (track: TrackState) => {
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

  const checkDuplicatedTrack = () => {
    if (!recommendTrack) return;
    const duplicatedTrack = tracks.filter(
      (track) => track.id === recommendTrack?.id
    );
    if (duplicatedTrack.length < 1) dispatch(addTrack(recommendTrack));
  };

  return (
    <Wrap>
      <AddCustomTrackButtonStyle
        onClick={() => addCustomTrack.mutate(tracks[playingPosition])}
      >
        <Icon icon={faHeart} />
      </AddCustomTrackButtonStyle>
    </Wrap>
  );
}

export default React.memo(AddCustomTrack);
