import styled from 'styled-components';
import { ICustomPlayList } from '../pages/CustomPlayList/CustomPlayList';
import Image from './atom/Image';
import Span from './atom/Span';
import CustomTrackGenre from './CustomTrackGenre';

interface CustomTrackItemProps {
  track: ICustomPlayList;
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

function CustomTrackItem({ track }: CustomTrackItemProps) {
  return (
    <TrackItem>
      <TrackColumn>
        <Image src={track.image} alt={track.name} />
        <TrackInfo>
          <Span TextStyle={TrackName} text={track.name} />
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
