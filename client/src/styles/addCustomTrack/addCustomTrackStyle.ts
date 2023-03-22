import styled, { keyframes } from 'styled-components';

const AddCustomTrackWrap = styled.div`
  width: 46px;
  height: 46px;
  background-color: #7fffd4;
  border: 3px solid #ff5474;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MobileAddCustomTrackWrap = styled(AddCustomTrackWrap)`
  position: fixed;
  right: 5px;
  bottom: 130px;
`;

export const TabletListAddCustomTrackWrap = styled(AddCustomTrackWrap)`
  position: absolute;
  right: 0;
  bottom: -60px;
`;

const TransisionAddCustomTrackButton = keyframes`
  0% {
    width: 20px;
    height: 20px;
    color: #fe3fcb;
  } 60% {
    width: 25px;
    height: 25px;
    color: #fe3fcb;
  } 100% {
    width: 25px;
    height: 25px;
    color: #E93636;
  }
`;

export const StyledAddCustomTrackButton = styled.button`
  width: 32px;
  height: 32px;
  padding: 7px;
  box-sizing: content-box;
  &:hover {
    svg {
      animation: ${TransisionAddCustomTrackButton} 1.2s ease forwards;
    }
  }
  svg {
    width: 22px;
    height: 22px;
    color: #fe3fcb;
  }
`;
