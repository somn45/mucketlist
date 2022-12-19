import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { SpanProps } from '../utils/types/atomTypes';

const AnimationStatusBar = keyframes`
  0% {
    background-color: black;
    width: 0;
  } 33% {
    background-color: #D363AD;
    width: 100%;
  }100% {
    background-color: #D363AD;
    width: 100%;
  }
`;

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
  top: 20px;
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
