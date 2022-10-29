import styled from 'styled-components';
import { SpanProps } from '../../../../utils/types/atomTypes';

const ArtistNameStyle = styled.span`
  font-size: 13px;
  color: #222222;
`;

function ArtistName({ text }: SpanProps) {
  return <ArtistNameStyle>{text}</ArtistNameStyle>;
}

export default ArtistName;
