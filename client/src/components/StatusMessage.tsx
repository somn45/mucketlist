import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { SpanProps } from '../utils/types/atomTypes';

const AnimationStatusBar = keyframes`
  0% {
    background-color: black;
    width: 0;
  } 13% {
    background-color: #D363AD;
    width: 420px;
  }100% {
    background-color: #D363AD;
    width: 420px;
  }
`;

const StatusMessageStyle = styled.span`
  padding: 10px;
  border-radius: 15px;
  font-weight: 600;
  text-align: center;
  white-space: nowrap;
  position: fixed;
  top: 20px;
  animation: ${AnimationStatusBar} 8s cubic-bezier(0.1, 0.5, 0.5, 1) forwards;
`;

function StatusMessage({ text }: SpanProps) {
  const [isShowBar, setIsShowBar] = useState(true);
  useEffect(() => {
    setTimeout(() => setIsShowBar(false), 8000);
  }, []);
  return isShowBar ? <StatusMessageStyle>{text}</StatusMessageStyle> : null;
}

export default StatusMessage;
