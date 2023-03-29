import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { AnimationStatusBar } from '../styles/animation/StatusBarAnimation';

import { SpanProps } from '../types/atomTypes/atom';

const StatusMessageStyle = styled.span`
  width: 100%;
  padding: 10px;
  border-radius: 15px;
  font-weight: 600;
  text-align: center;
  white-space: nowrap;
  align-self: center;
  z-index: 3;
  position: fixed;
  left: 0px;
  top: 0px;
  animation: ${AnimationStatusBar} 3s cubic-bezier(0.1, 0.5, 0.5, 1) forwards;
`;

function StatusMessage({ text }: SpanProps) {
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    setIsShow(true);
    setTimeout(() => setIsShow(false), 5000);
  }, [text]);
  return isShow ? <StatusMessageStyle>{text}</StatusMessageStyle> : null;
}

export default StatusMessage;
