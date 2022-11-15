import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const HandBookAddCustomTrackWrap = styled.div`
  width: 260px;
  position: absolute;
  right: 60px;
  bottom: 130px;
`;

function HandBookAddCustomTrack() {
  return (
    <HandBookAddCustomTrackWrap>
      <span>
        관심 있는 트랙을 나의 플레이리스트에 저장할 수 있는 버튼입니다. 같은
        곡은 한번만 저장할 수 있습니다.
      </span>
      <FontAwesomeIcon icon={faArrowRight} />
    </HandBookAddCustomTrackWrap>
  );
}

export default HandBookAddCustomTrack;
