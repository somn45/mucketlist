import styled from 'styled-components';
import { SpanProps } from '../../../../utils/types/atomTypes';

const TrackNameStyle = styled.span`
  font-size: 14px;
  font-weight: 600;
`;

function TrackName({ text }: SpanProps) {
  return <TrackNameStyle>{text}</TrackNameStyle>;
}

export default TrackName;
