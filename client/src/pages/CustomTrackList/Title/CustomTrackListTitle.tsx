import { Title } from '../../../styles/customTracks/cusomTrackStyle';
import { SpanProps } from '../../../types/atomTypes/atom';

function CustomTrackListTitle({ text }: SpanProps) {
  return <Title>{text}</Title>;
}

export default CustomTrackListTitle;
