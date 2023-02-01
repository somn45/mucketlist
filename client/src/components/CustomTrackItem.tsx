import { AxiosResponse } from 'axios';
import styled from 'styled-components';
import { Cookies } from 'react-cookie';
import { useDispatch } from 'react-redux';

import { ICustomPlayList } from '../pages/CustomPlayList/CustomPlayList';
import CustomTrackGenre from './CustomTrackGenre';
import {
  deleteCustomTrack,
  updateStatusMessage,
} from '../store/reducers/rootReducer';
import requestAxios from '../utils/functions/requestAxios';

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

const SERVER_URL = 'https://mucketlist-server.site';
const cookies = new Cookies();

function CustomTrackItem({ track }: CustomTrackItemProps) {
  const dispatch = useDispatch();

  const handleDeleteCustomTrack = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    const firebaseUid = cookies.get('firebaseUid');
    const requestAxiosParams = {
      method: 'delete',
      url: `${SERVER_URL}/tracks/delete`,
      data: { firebaseUid, id },
    };
    const response = await requestAxios<
      DeleteCustomTrackAxiosRequest,
      AxiosResponse
    >(requestAxiosParams);
    if (response.status === 200) {
      dispatch(deleteCustomTrack(id));
      dispatch(
        updateStatusMessage(
          `${track.name}이 찜한 트랙 리스트에서 삭제되었습니다.`
        )
      );
    }
  };
  return (
    <TrackItem>
      <TrackColumn>
        <img src={track.image} alt={track.name} />
        <TrackInfo>
          <div>
            <TrackName>{track.name}</TrackName>
            <TrackDeleteButton
              onClick={(e) => handleDeleteCustomTrack(e, track.id)}
            >
              X
            </TrackDeleteButton>
          </div>
          <span>{`아티스트 ${track.artists}`}</span>
          <span>{`발매일 ${track.release_date}`}</span>
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
