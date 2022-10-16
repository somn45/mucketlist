import styled from 'styled-components';
import Span, { SpanProps } from '../../../components/atom/Span';

const TiTle = styled.span`
  font-size: 20px;
  font-weight: 600;
`;

function CustomPlayListTitle({ text }: SpanProps) {
  return <Span TextStyle={TiTle} text={text} />;
}

export default CustomPlayListTitle;
