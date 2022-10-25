import styled from 'styled-components';
import { DivProps } from '../../../../utils/types/atomTypes';

const PlayerWrap = styled.div`
  width: 370px;
  height: 80px;
  background-color: white;
  border: 5px solid green;
  border-radius: 25px;
  position: fixed;
  bottom: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

function Wrap({ children }: DivProps) {
  return <PlayerWrap>{children}</PlayerWrap>;
}

export default Wrap;
