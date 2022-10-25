import styled from 'styled-components';
import { SpanProps } from '../utils/types/atomTypes';

const StatusMessageStyle = styled.span`
  margin-top: 90px;
  color: white;
  display: block;
`;

function StatusMessage({ text }: SpanProps) {
  return <StatusMessageStyle>{text}</StatusMessageStyle>;
}

export default StatusMessage;
