import { useMediaQuery } from 'react-responsive';
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
`;

const MobileAddCustomTrackWrap = styled(AddCustomTrackWrap)`
  position: fixed;
  right: 5px;
  bottom: 130px;
`;

const TabletListAddCustomTrackWrap = styled(AddCustomTrackWrap)`
  position: absolute;
  right: 0;
  bottom: -60px;
`;

function Wrap({ children }: DivProps) {
  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });
  return isMobile ? (
    <MobileAddCustomTrackWrap>{children}</MobileAddCustomTrackWrap>
  ) : (
    <TabletListAddCustomTrackWrap>{children}</TabletListAddCustomTrackWrap>
  );
}

export default Wrap;
