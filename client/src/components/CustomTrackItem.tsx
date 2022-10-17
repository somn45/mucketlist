import axios from 'axios';
import styled from 'styled-components';
import { Cookies } from 'react-cookie';
import { useDispatch } from 'react-redux';

import { ICustomPlayList } from '../pages/CustomPlayList/CustomPlayList';
import Button from './atom/Button';
import Image from './atom/Image';
import Span from './atom/Span';
import CustomTrackGenre from './CustomTrackGenre';
import {
  deleteCustomTrack,
  updateStatusMessage,
} from '../store/reducers/rootReducer';

interface CustomTrackItemProps {
  track: ICustomPlayList;
}

interface IUseSelector {
  customTrack: ICustomPlayList[];
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

const TrackGenreList = styled.div`
  display: inline;
`;

const SERVER_URL = 'http://localhost:3001';
const cookies = new Cookies();

function CustomTrackItem({ track }: CustomTrackItemProps) {
  const dispatch = useDispatch();

  const handleDeleteCustomTrack = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    const firebaseUid = cookies.get('firebaseUid');
    const response = await axios.delete(
      `${SERVER_URL}/tracks/delete?id=${id}&firebaseUid=${firebaseUid}`
    );
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
        <Image src={track.image} alt={track.name} />
        <TrackInfo>
          <div>
            <Span TextStyle={TrackName} text={track.name} />
            <Button
              value="X"
              onClick={(e) => handleDeleteCustomTrack(e, track.id)}
            />
          </div>
          <Span text={`아티스트 : ${track.artists}`} />
          <Span text={`발매일 : ${track.release_date}`} />
        </TrackInfo>
      </TrackColumn>
      <TrackGenreList>
        {track.genres.map((genre) => (
          <CustomTrackGenre key={genre} genre={genre} />
        ))}
      </TrackGenreList>
    </TrackItem>
  );
}

export default CustomTrackItem;
