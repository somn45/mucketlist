import styled from 'styled-components';
import { DivProps } from '../../../../utils/types/atomTypes';

const AddCustomTrackWrap = styled.div`
  width: 46px;
  height: 46px;
  background-color: #7fffd4;
  border: 3px solid #ff5474;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  right: 10px;
  bottom: 90px;
`;
function Wrap({ children }: DivProps) {
  return <AddCustomTrackWrap>{children}</AddCustomTrackWrap>;
}

export default Wrap;
