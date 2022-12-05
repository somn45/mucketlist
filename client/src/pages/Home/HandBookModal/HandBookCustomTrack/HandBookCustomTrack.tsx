import { faTurnUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import { IMediaQuery } from '../HandBookModal';

const HandBookCustomTrackWrap = styled.div<IMediaQuery>`
  width: 260px;
  position: absolute;
  top: 80px;
  left: 40px;
  svg {
    transform: scaleX(-1);
  }
`;

function HandBookCustomTrack() {
  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });
  const isTablet = useMediaQuery({
    query: '(max-width: 1023px)',
  });
  return (
    <HandBookCustomTrackWrap isMobile={isMobile} isTablet={isTablet}>
      <FontAwesomeIcon icon={faTurnUp} />
      <span>
        플레이리스트에 등록된 트랙을 확인할 수 있습니다. 혹시나 잘못 등록했거나
        트랙이 마음에 들지 않는다면 제목 옆의 X 버튼을 통하여 커스텀
        플레이리스트에서 제외시킬 수 있습니다.
      </span>
    </HandBookCustomTrackWrap>
  );
}

export default HandBookCustomTrack;
