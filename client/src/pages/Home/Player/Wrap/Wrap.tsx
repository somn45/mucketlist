import styled, { css, keyframes } from 'styled-components';
import { DivProps } from '../../../../utils/types/atomTypes';

interface PlayerWrapProps extends DivProps {
  isPlay: boolean;
}

const PlayerWrap = styled.div<{ isPlay: boolean }>`
  width: 370px;
  height: 80px;
  background-color: white;
  border: ${(props) => (props.isPlay ? '5px solid green' : '5px solid red')};
  border-radius: 25px;
  position: fixed;
  bottom: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

function Wrap({ children, isPlay }: PlayerWrapProps) {
  return <PlayerWrap isPlay={isPlay}>{children}</PlayerWrap>;
}

export default Wrap;
