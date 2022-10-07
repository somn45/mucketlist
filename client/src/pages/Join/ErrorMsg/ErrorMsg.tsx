import styled from 'styled-components';
import Span, { SpanProps } from '../../../components/atom/Span';

const ErrorMsgStyle = styled.span`
  color: red;
  text-decoration: underline;
`;

function ErrorMsg({ text }: Omit<SpanProps, 'TextStyle'>) {
  return <Span TextStyle={ErrorMsgStyle} text={text} />;
}

export default ErrorMsg;
