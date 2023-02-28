import { AxiosResponse } from 'axios';
import styled from 'styled-components';
import { Cookies } from 'react-cookie';
import { useDispatch } from 'react-redux';

import { ICustomPlayList } from '../pages/CustomPlayList/CustomPlayList';
import CustomTrackGenre from './CustomTrackGenre';
import { updateStatusMessage } from '../store/reducers/rootReducer';
import requestAxios from '../utils/functions/requestAxios';
import { useMutation } from 'react-query';
import { queryClient } from '..';

interface CustomTrackItemProps {
  track: ICustomPlayList;
}

interface DeleteCustomTrackAxiosRequest {
  firebaseUid: string;
  id: string;
}

const TrackItem = styled.li`
  font-size: 14px;
  color: #ddeedd;
  margin-bottom: 14px;
  display: flex;
  flex-direction: column;
`;

const TrackColumn = styled.div`
  margin-bottom: 4px;
  display: flex;
  flex-direction: row;
`;

const TrackInfo = styled.div`
  margin-left: 8px;
  display: flex;
  flex-direction: column;
  span {
    margin-bottom: 3px;
  }
`;

const TrackName = styled.span`
  color: white;
  font-weight: 600;
`;

const TrackDeleteButton = styled.button`
  color: #ff5252;
  font-weight: 600;
`;

const TrackGenreList = styled.div`
  display: inline;
`;

const SERVER_URL = 'http://localhost:3001';
const cookies = new Cookies();

function CustomTrackItem({ track }: CustomTrackItemProps) {
  const dispatch = useDispatch();

  const deleteCustomTracks = async (id: string) => {
    const firebaseUid = cookies.get('firebaseUid');
    const requestAxiosParams = {
      method: 'delete',
      url: `${SERVER_URL}/tracks/delete`,
      data: { firebaseUid, id },
    };
    const { data } = await requestAxios<
      DeleteCustomTrackAxiosRequest,
      AxiosResponse
    >(requestAxiosParams);
    return data;
  };

  const deleteMutation = useMutation((id: string) => deleteCustomTracks(id), {
    onMutate: async () => {
      queryClient.cancelQueries('customTracks');
    },
    onSuccess: () => {
      dispatch(
        updateStatusMessage(
          `${track.name}이 찜한 트랙 리스트에서 삭제되었습니다.`
        )
      );
    },
    onSettled: () => queryClient.invalidateQueries(),
  });

  return (
    <TrackItem>
      <TrackColumn>
        <img src={track.image} alt={track.name} />
        <TrackInfo>
          <div>
            <TrackName>{track.name}</TrackName>
            <TrackDeleteButton onClick={() => deleteMutation.mutate(track.id)}>
              X
            </TrackDeleteButton>
          </div>
          <span>{`아티스트 ${track.artists}`}</span>
          <span>{`발매일 ${track.releaseDate}`}</span>
        </TrackInfo>
      </TrackColumn>
      <TrackGenreList>
        {track.genres.slice(0, 4).map((genre) => (
          <CustomTrackGenre key={genre} genre={genre} />
        ))}
      </TrackGenreList>
    </TrackItem>
  );
}

export default CustomTrackItem;
