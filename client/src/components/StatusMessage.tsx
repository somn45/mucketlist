import styled from 'styled-components';
import Span, { SpanProps } from './atom/Span';

const StatusMessageStyle = styled.span`
  margin-top: 90px;
  color: white;
  display: block;
`;

function StatusMessage({ text }: SpanProps) {
  return <Span TextStyle={StatusMessageStyle} text={text} />;
}

export default StatusMessage;
