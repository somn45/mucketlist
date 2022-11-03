import React from 'react';
import styled from 'styled-components';
import { SpanProps } from '../../../utils/types/atomTypes';

const ErrorMsgStyle = styled.span`
  color: red;
  text-decoration: underline;
`;

function ErrorMsg({ text }: SpanProps) {
  return <ErrorMsgStyle>{text}</ErrorMsgStyle>;
}

export default React.memo(ErrorMsg);
