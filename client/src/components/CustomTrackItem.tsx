import { ICustomPlayList } from '../pages/CustomPlayList/CustomPlayList';
import Span from './atom/Span';

interface CustomTrackItemProps {
  track: ICustomPlayList;
}

function CustomTrackItem({ track }: CustomTrackItemProps) {
  return <Span text={track.name} />;
}

export default CustomTrackItem;
