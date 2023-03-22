import { faTurnUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';

import { ContentLayout } from '../HandBookModal';

import { IMediaQuery } from '../../../../types/mediaQueryTypes/mediaQueryTypes';

import { MOBILE_SIZE, TABLET_SIZE } from '../../../../constants/constants';

const HandBookClearTracksWrap = styled.div<IMediaQuery>`
  width: 260px;
  position: absolute;
  top: ${(props) => (props.isMobile ? '100px' : '0')};
  left: ${(props) => (props.isMobile ? '33%' : props.isTablet ? '33%' : '23%')};
  align-self: center;
  svg {
    transform: scaleX(-1);
  }
`;

function HandBookClearTracks() {
  const isMobile = useMediaQuery({
    query: MOBILE_SIZE,
  });
  const isTablet = useMediaQuery({
    query: TABLET_SIZE,
  });
  const HandBookContent = (
    <HandBookClearTracksWrap isMobile={isMobile} isTablet={isTablet}>
      <FontAwesomeIcon icon={faTurnUp} />
      <span>
        사용자의 관심 장르가 달라졌거나 등록된 트랙 리스트를 교체하고 싶은 경우
        이 버튼을 누르면 새로운 트랙 리스트로 교체됩니다.
      </span>
    </HandBookClearTracksWrap>
  );
  return isMobile ? (
    <>{HandBookContent}</>
  ) : (
    <ContentLayout>{HandBookContent}</ContentLayout>
  );
}

export default HandBookClearTracks;
