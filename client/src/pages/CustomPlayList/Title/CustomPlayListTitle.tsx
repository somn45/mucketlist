import styled from 'styled-components';
import { SpanProps } from '../../../utils/types/atomTypes';

const Title = styled.span`
  font-size: 20px;
  font-weight: 600;
`;

function CustomPlayListTitle({ text }: SpanProps) {
  return <Title>{text}</Title>;
}

export default CustomPlayListTitle;
